import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CancellationReasonTypeEnum } from '../../common/enums/erd.enums';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';

@Entity('order_cancellations')
export class OrderCancellation {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  orderId!: string;

  @Column({ nullable: true })
  orderItemId?: string;

  @Column({})
  cancelledByUserId!: string;

  @Column({
    type: 'enum',
    enum: CancellationReasonTypeEnum,
  })
  reasonType!: CancellationReasonTypeEnum;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  refundAmount!: number;

  @CreateDateColumn({})
  cancelledAt!: Date;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({})
  order!: Order;

  @ManyToOne(() => OrderItem, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({})
  orderItem?: OrderItem;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({})
  cancelledByUser!: User;
}
