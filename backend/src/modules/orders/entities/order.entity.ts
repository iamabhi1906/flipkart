import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  OrderStatusEnum,
  PaymentMethodEnum,
  PaymentStatusEnum,
} from '../../common/enums/erd.enums';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ length: 50, unique: true })
  orderNumber!: string;

  @Column({})
  customerId!: string;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status!: OrderStatusEnum;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  paymentStatus!: PaymentStatusEnum;

  @Column({
    type: 'enum',
    enum: PaymentMethodEnum,
  })
  paymentMethod!: PaymentMethodEnum;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  taxAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  shippingAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ length: 50, nullable: true })
  couponCode?: string;

  @Column({ length: 200 })
  shippingFullName!: string;

  @Column({ length: 20 })
  shippingMobileNumber!: string;

  @Column({ length: 255 })
  shippingAddressLine1!: string;

  @Column({ length: 255, nullable: true })
  shippingAddressLine2?: string;

  @Column({ length: 255, nullable: true })
  shippingLandmark?: string;

  @Column({ length: 100 })
  shippingCity!: string;

  @Column({ length: 100 })
  shippingState!: string;

  @Column({ length: 100 })
  shippingCountry!: string;

  @Column({ length: 20 })
  shippingPostalCode!: string;

  @CreateDateColumn({})
  placedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  shippedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt?: Date;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({})
  customer!: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
