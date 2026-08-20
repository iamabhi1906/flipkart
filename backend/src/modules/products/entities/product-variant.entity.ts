import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  productId!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 100, unique: true, nullable: true })
  sku?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price?: number;

  @Column({ default: 0 })
  stockQuantity!: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes?: Record<string, any>;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({})
  product!: Product;
}
