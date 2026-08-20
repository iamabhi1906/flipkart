import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@Entity('product_reviews')
export class ProductReview {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  productId!: string;

  @Column({})
  userId!: string;

  @Column({})
  orderItemId!: string;

  @Column()
  rating!: number;

  @Column({ length: 255, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ default: true })
  isVerifiedPurchase!: boolean;

  @Column({ default: true })
  isVisible!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({})
  product!: Product;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({})
  user!: User;

  @ManyToOne(() => OrderItem, { onDelete: 'CASCADE' })
  @JoinColumn({})
  orderItem!: OrderItem;
}
