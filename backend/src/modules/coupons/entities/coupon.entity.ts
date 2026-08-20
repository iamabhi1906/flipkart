import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CouponTypeEnum } from '../../common/enums/erd.enums';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ length: 50, unique: true })
  code!: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: CouponTypeEnum,
  })
  couponType!: CouponTypeEnum;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  minimumOrderAmount?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  maximumDiscountAmount?: number;

  @Column({ nullable: true })
  usageLimit?: number;

  @Column({ default: 0 })
  usageCount!: number;

  @Column({ type: 'timestamp' })
  startsAt!: Date;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;
}
