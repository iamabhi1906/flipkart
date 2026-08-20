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

  @Column({})
  productId!: string;

  @Column({ length: 500 })
  imageUrl!: string;

  @Column({ length: 255, nullable: true })
  altText?: string;

  @Column({ default: 1 })
  sortOrder!: number;

  @Column({ default: false })
  isPrimary!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({})
  product!: Product;
}
