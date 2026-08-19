import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserRoleEnums from '../enums/user.role';
import UserStatusEnum from '../enums/user.status';
import AuthProviderEnum from 'src/modules/auth/enums/auth.provider';
import { UserProfile } from './user-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  mobileNumber!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnums,
    default: UserRoleEnums.CUSTOMER,
  })
  role!: UserRoleEnums;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status!: UserStatusEnum;

  @Column({
    type: 'enum',
    enum: AuthProviderEnum,
    default: AuthProviderEnum.EMAIL,
  })
  authProvider!: AuthProviderEnum;

  @Column({ nullable: true })
  googleId?: string;

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
}
