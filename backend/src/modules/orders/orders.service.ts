import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { Address } from '../addresses/entities/address.entity';
import { CheckoutDto } from './dto/checkout.dto';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  OrderItemStatusEnum,
  ProductStatusEnum,
} from '../common/enums/erd.enums';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async checkout(userId: string, dto: CheckoutDto) {
    return await this.dataSource.transaction(async (manager) => {
      const cart = await manager.findOne(Cart, { where: { userId }, relations: { items: true } });
      if (!cart || !cart.items || cart.items.length === 0) throw new BadRequestException('Your cart is empty');

      let addr: any = null;
      if (dto.addressId) {
        addr = await manager.findOne(Address, { where: { id: dto.addressId, userId } });
        if (!addr) throw new NotFoundException('Selected shipping address not found');
      } else if (dto.shippingAddress?.addressLine1) {
        addr = dto.shippingAddress;
      } else {
        addr = await manager.findOne(Address, { where: { userId, isDefault: true } }) || await manager.findOne(Address, { where: { userId } });
      }
      if (!addr) throw new BadRequestException('Please select or add a shipping address');

      const orderItems: Partial<OrderItem>[] = [];
      let subtotal = 0;

      for (const item of cart.items) {
        const product = await manager.findOne(Product, { where: { id: item.productId } });
        if (!product || product.status !== ProductStatusEnum.ACTIVE) throw new BadRequestException(`Product "${product?.name || item.productId}" is not available`);

        let variant: ProductVariant | null = null;
        if (item.variantId) {
          variant = await manager.findOne(ProductVariant, { where: { id: item.variantId } });
          if (!variant || variant.productId !== product.id) throw new BadRequestException(`Invalid variant for "${product.name}"`);
          if (Number(variant.stockQuantity || 0) < item.quantity) throw new BadRequestException(`Insufficient stock for "${variant.name}"`);
          variant.stockQuantity -= item.quantity;
          await manager.save(ProductVariant, variant);
        } else {
          if (Number(product.stockQuantity || 0) < item.quantity) throw new BadRequestException(`Insufficient stock for "${product.name}"`);
          product.stockQuantity -= item.quantity;
          await manager.save(Product, product);
        }

        const unitPrice = variant?.price !== undefined && variant?.price !== null ? Number(variant.price) : Number(product.price);
        const itemTotal = unitPrice * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          productId: product.id,
          vendorId: product.vendorId,
          variantId: item.variantId || undefined,
          productName: variant ? `${product.name} (${variant.name})` : product.name,
          sku: variant?.sku || product.sku,
          quantity: item.quantity,
          unitPrice,
          taxRate: 18,
          taxAmount: Math.round(itemTotal * 0.18 * 100) / 100,
          discountAmount: 0,
          totalAmount: itemTotal,
          status: OrderItemStatusEnum.CONFIRMED,
        });
      }

      const taxAmount = Math.round(subtotal * 0.18 * 100) / 100;
      const shippingAmount = subtotal > 1000 ? 0 : 99;
      const totalAmount = subtotal + taxAmount + shippingAmount;
      const orderNumber = `FLIP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder = manager.create(Order, {
        orderNumber, customerId: userId, status: OrderStatusEnum.CONFIRMED, paymentStatus: PaymentStatusEnum.PAID, paymentMethod: dto.paymentMethod, subtotal, taxAmount, shippingAmount, discountAmount: 0, totalAmount, couponCode: dto.couponCode,
        shippingFullName: addr.fullName || addr.name || 'Valued Customer', shippingMobileNumber: addr.mobileNumber || addr.phone || '9999999999', shippingAddressLine1: addr.addressLine1 || addr.street || 'Address Line 1', shippingAddressLine2: addr.addressLine2 || '', shippingLandmark: addr.landmark || '', shippingCity: addr.city || 'City', shippingState: addr.state || 'State', shippingCountry: addr.country || 'India', shippingPostalCode: addr.postalCode || addr.pincode || '110001', confirmedAt: new Date(),
      });

      const savedOrder = await manager.save(Order, newOrder);
      const itemsToSave = orderItems.map((i) => manager.create(OrderItem, { ...i, orderId: savedOrder.id }));
      await manager.save(OrderItem, itemsToSave);
      await manager.delete(CartItem, { cartId: cart.id });

      return manager.findOne(Order, { where: { id: savedOrder.id }, relations: { items: { product: true } } });
    });
  }

  async findMyOrders(userId: string) {
    return this.orderRepository.find({ where: { customerId: userId }, relations: { items: { product: { images: true } } }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, userId: string) {
    const order = await this.orderRepository.findOne({ where: { id, customerId: userId }, relations: { items: { product: { images: true } } } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, { where: { id: orderId, customerId: userId }, relations: { items: true } });
      if (!order) throw new NotFoundException('Order not found');
      if (order.status === OrderStatusEnum.CANCELLED || order.status === OrderStatusEnum.DELIVERED) throw new BadRequestException(`Order cannot be cancelled in status ${order.status}`);

      for (const item of order.items) {
        if (item.status !== OrderItemStatusEnum.CANCELLED) {
          item.status = OrderItemStatusEnum.CANCELLED;
          item.cancelledAt = new Date();
          await manager.save(OrderItem, item);

          if (item.variantId) {
            const v = await manager.findOne(ProductVariant, { where: { id: item.variantId } });
            if (v) { v.stockQuantity += item.quantity; await manager.save(ProductVariant, v); }
          } else {
            const p = await manager.findOne(Product, { where: { id: item.productId } });
            if (p) { p.stockQuantity += item.quantity; await manager.save(Product, p); }
          }
        }
      }

      order.status = OrderStatusEnum.CANCELLED;
      order.cancelledAt = new Date();
      return manager.save(Order, order);
    });
  }

  async findVendorOrderItems(vendorId: string) {
    return this.orderItemRepository.find({ where: { vendorId }, relations: { order: true, product: { images: true }, variant: true }, order: { createdAt: 'DESC' } });
  }

  async updateVendorOrderItemStatus(vendorId: string, itemId: string, status: OrderItemStatusEnum) {
    const item = await this.orderItemRepository.findOne({ where: { id: itemId, vendorId }, relations: { order: true } });
    if (!item) throw new NotFoundException('Order item not found for vendor');

    item.status = status;
    if (status === OrderItemStatusEnum.DELIVERED) item.deliveredAt = new Date();
    if (status === OrderItemStatusEnum.CANCELLED) item.cancelledAt = new Date();
    await this.orderItemRepository.save(item);

    await this.syncParentOrderStatus(item.orderId);
    return item;
  }

  async findAllOrdersForAdmin() {
    return this.orderRepository.find({ relations: { customer: true, items: { product: true } }, order: { createdAt: 'DESC' } });
  }

  async updateOrderStatusByAdmin(orderId: string, status: OrderStatusEnum) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.orderRepository.save(order);
  }

  private async syncParentOrderStatus(orderId: string) {
    const items = await this.orderItemRepository.find({ where: { orderId } });
    if (!items.length) return;

    const allDelivered = items.every((i) => i.status === OrderItemStatusEnum.DELIVERED);
    const allCancelled = items.every((i) => i.status === OrderItemStatusEnum.CANCELLED);
    const allShipped = items.every((i) => i.status === OrderItemStatusEnum.SHIPPED || i.status === OrderItemStatusEnum.DELIVERED);

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) return;

    if (allDelivered) { order.status = OrderStatusEnum.DELIVERED; order.deliveredAt = new Date(); }
    else if (allCancelled) { order.status = OrderStatusEnum.CANCELLED; order.cancelledAt = new Date(); }
    else if (allShipped) { order.status = OrderStatusEnum.SHIPPED; order.shippedAt = new Date(); }
    else if (items.some((i) => i.status === OrderItemStatusEnum.CANCELLED)) { order.status = OrderStatusEnum.PARTIALLY_CANCELLED; }

    await this.orderRepository.save(order);
  }
}
