import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressTypeEnum } from '../../common/enums/erd.enums';
import { User } from '../../users/entities/user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  userId!: string;

  @Column({
    type: 'enum',
    enum: AddressTypeEnum,
    default: AddressTypeEnum.HOME,
  })
  addressType!: AddressTypeEnum;

  @Column({ length: 200 })
  fullName!: string;

  @Column({ length: 20 })
  mobileNumber!: string;

  @Column({ length: 255 })
  addressLine1!: string;

  @Column({ length: 255, nullable: true })
  addressLine2?: string;

  @Column({ length: 255, nullable: true })
  landmark?: string;

  @Column({ length: 100 })
  city!: string;

  @Column({ length: 100 })
  state!: string;

  @Column({ length: 100, default: 'India' })
  country!: string;

  @Column({ length: 20 })
  postalCode!: string;

  @Column({ default: false })
  isDefault!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({})
  user!: User;
}
