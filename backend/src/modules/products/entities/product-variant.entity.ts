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

  @Column({ name: 'product_id' })
  productId!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 100, unique: true, nullable: true })
  sku?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price?: number;

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity!: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column({ length: 500, nullable: true })
  thumbnail?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}
