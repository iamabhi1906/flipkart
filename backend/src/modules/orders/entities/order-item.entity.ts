import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemStatusEnum } from '../../common/enums/erd.enums';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { User } from '../../users/entities/user.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  orderId!: string;

  @Column({})
  productId!: string;

  @Column({})
  vendorId!: string;

  @Column({ nullable: true })
  variantId?: string;

  @Column({ length: 255 })
  productName!: string;

  @Column({ length: 100, nullable: true })
  sku?: string;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  taxAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount!: number;

  @Column({
    type: 'enum',
    enum: OrderItemStatusEnum,
    default: OrderItemStatusEnum.PENDING,
  })
  status!: OrderItemStatusEnum;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt?: Date;

  @Column({ length: 10, nullable: true })
  deliveryOtp?: string;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({})
  order!: Order;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({})
  product!: Product;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({})
  vendor!: User;

  @ManyToOne(() => ProductVariant, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({})
  variant?: ProductVariant;
}
