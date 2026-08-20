import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@Entity('vendor_earnings')
export class VendorEarning {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  vendorId!: string;

  @Column({})
  orderId!: string;

  @Column({})
  orderItemId!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  grossAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  taxAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  commissionAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  refundAmount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  netEarning!: number;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({})
  vendor!: User;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({})
  order!: Order;

  @ManyToOne(() => OrderItem, { onDelete: 'CASCADE' })
  @JoinColumn({})
  orderItem!: OrderItem;
}
