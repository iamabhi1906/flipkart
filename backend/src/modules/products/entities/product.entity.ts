import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatusEnum } from '../../common/enums/erd.enums';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  vendorId!: string;

  @Column({})
  categoryId!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 300, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 100, unique: true })
  sku!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  compareAtPrice?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costPrice?: number;

  @Column({ default: 0 })
  stockQuantity!: number;

  @Column({ default: 5 })
  lowStockThreshold!: number;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    default: ProductStatusEnum.DRAFT,
  })
  status!: ProductStatusEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weight?: number;

  @Column({ length: 20, nullable: true })
  weightUnit?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate!: number;

  @Column({ default: 0 })
  totalSold!: number;

  @Column({ default: 0 })
  viewCount!: number;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({})
  vendor!: User;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({})
  category!: Category;

  @OneToMany(() => ProductImage, (image) => image.product)
  images!: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: ProductVariant[];
}
