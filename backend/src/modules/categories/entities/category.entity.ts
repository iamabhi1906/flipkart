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

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: true })
  parentId?: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 180, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 500, nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({name: 'parent_id'})
  parentCategory?: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories!: Category[];
}
