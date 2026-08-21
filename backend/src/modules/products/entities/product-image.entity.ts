import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'product_id' })
  productId!: string;

  @Column({ name: 'image_url', length: 500 })
  imageUrl!: string;

  @Column({ name: 'alt_text', length: 255, nullable: true })
  altText?: string;

  @Column({ name: 'sort_order', default: 1 })
  sortOrder!: number;

  @Column({ name: 'is_primary', default: false })
  isPrimary!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}
