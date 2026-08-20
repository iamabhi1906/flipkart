import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackingStatusEnum } from '../../common/enums/erd.enums';
import { Order } from '../../orders/entities/order.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@Entity('order_tracking')
export class OrderTracking {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  orderId!: string;

  @Column({ nullable: true })
  orderItemId?: string;

  @Column({
    type: 'enum',
    enum: TrackingStatusEnum,
  })
  status!: TrackingStatusEnum;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  location?: string;

  @Column({ length: 150, nullable: true })
  trackingNumber?: string;

  @Column({ length: 150, nullable: true })
  courierName?: string;

  @CreateDateColumn({})
  createdAt!: Date;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({})
  order!: Order;

  @ManyToOne(() => OrderItem, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({})
  orderItem?: OrderItem;
}
