import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ProductStatusEnum } from '../common/enums/erd.enums';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: { items: { product: { images: true }, variant: true } },
    });
    if (!cart) {
      cart = await this.cartRepository.save(
        this.cartRepository.create({ userId }),
      );
      cart.items = [];
    }
    return cart;
  }

  async getCartSummary(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    const items = cart.items.map((item) => {
      const unitPrice =
        item.variant?.price !== undefined && item.variant?.price !== null
          ? Number(item.variant.price)
          : Number(item.product.price);
      return {
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice,
        subtotal: unitPrice * item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
          images: item.product.images,
        },
        variant: item.variant
          ? {
              id: item.variant.id,
              name: item.variant.name,
              price: item.variant.price
                ? Number(item.variant.price)
                : undefined,
              stockQuantity: item.variant.stockQuantity,
              attributes: item.variant.attributes,
            }
          : undefined,
      };
    });

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      totalAmount: items.reduce((sum, i) => sum + i.subtotal, 0),
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    };
  }

  async addItem(userId: string, dto: AddToCartDto) {
    const cart = await this.getOrCreateCart(userId);
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.status !== ProductStatusEnum.ACTIVE)
      throw new BadRequestException('Product is inactive');

    let variant: ProductVariant | null = null;
    if (dto.variantId) {
      variant = await this.productVariantRepository.findOne({
        where: { id: dto.variantId },
      });
      if (!variant) throw new NotFoundException('Variant not found');
      if (variant.productId !== product.id)
        throw new BadRequestException('Variant does not belong to product');
    }

    const availableStock = variant
      ? Number(variant.stockQuantity || 0)
      : Number(product.stockQuantity || 0);
    const existing = await this.cartItemRepository.findOne({
      where: {
        cartId: cart.id,
        productId: dto.productId,
        variantId: dto.variantId ? dto.variantId : IsNull(),
      },
    });
    const newQty = (existing?.quantity || 0) + dto.quantity;

    if (newQty > availableStock)
      throw new BadRequestException(
        `Requested quantity (${newQty}) exceeds stock (${availableStock})`,
      );

    const serverPrice =
      variant?.price !== undefined && variant?.price !== null
        ? Number(variant.price)
        : Number(product.price);
    if (existing) {
      existing.quantity = newQty;
      existing.unitPrice = serverPrice;
      await this.cartItemRepository.save(existing);
    } else {
      await this.cartItemRepository.save(
        this.cartItemRepository.create({
          cartId: cart.id,
          productId: dto.productId,
          variantId: dto.variantId || undefined,
          quantity: dto.quantity,
          unitPrice: serverPrice,
        }),
      );
    }
    return this.getCartSummary(userId);
  }

  async updateItemQuantity(
    userId: string,
    itemId: string,
    dto: UpdateCartItemDto,
  ) {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.cartItemRepository.findOne({
      where: { id: itemId, cartId: cart.id },
      relations: { product: true, variant: true },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    if (dto.quantity <= 0) {
      await this.cartItemRepository.remove(item);
      return this.getCartSummary(userId);
    }

    const availableStock = item.variant
      ? Number(item.variant.stockQuantity || 0)
      : Number(item.product.stockQuantity || 0);
    if (dto.quantity > availableStock)
      throw new BadRequestException(
        `Requested quantity (${dto.quantity}) exceeds stock (${availableStock})`,
      );

    item.quantity = dto.quantity;
    await this.cartItemRepository.save(item);
    return this.getCartSummary(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.cartItemRepository.findOne({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Cart item not found');
    await this.cartItemRepository.remove(item);
    return this.getCartSummary(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    await this.cartItemRepository.delete({ cartId: cart.id });
    return this.getCartSummary(userId);
  }
}
