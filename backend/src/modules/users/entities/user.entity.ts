import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  AuthProviderEnum,
  UserRoleEnum,
  UserStatusEnum,
} from '../../common/enums/erd.enums';
import { UserProfile } from './user-profile.entity';
import { VendorProfile } from '../../vendors/entities/vendor.entity';
import { AdminProfile } from '../../admins/entities/admin.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Order } from '../../orders/entities/order.entity';
import { ProductReview } from '../../reviews/entities/product-review.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  mobileNumber?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CUSTOMER,
  })
  role!: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status!: UserStatusEnum;

  @CreateDateColumn()
  joinedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile!: UserProfile;

  @OneToOne(() => VendorProfile, (vendorProfile) => vendorProfile.user)
  vendorProfile?: VendorProfile;

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
  adminProfile?: AdminProfile;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews!: ProductReview[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];
}
