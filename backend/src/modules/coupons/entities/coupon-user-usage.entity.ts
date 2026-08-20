import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { User } from '../../users/entities/user.entity';

@Entity('coupon_user_usage')
export class CouponUserUsage {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  couponId!: string;

  @Column({})
  userId!: string;

  @Column({})
  orderId!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  discountAmount!: number;

  @CreateDateColumn({})
  usedAt!: Date;

  @ManyToOne(() => Coupon, { onDelete: 'CASCADE' })
  @JoinColumn({})
  coupon!: Coupon;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({})
  user!: User;
}
