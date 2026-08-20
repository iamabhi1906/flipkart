import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('vendor_profiles')
export class VendorProfile {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  userId!: string;

  @Column({ length: 255 })
  businessName!: string;

  @Column({ type: 'text', nullable: true })
  businessDescription?: string;

  @Column({ length: 255, nullable: true })
  businessEmail?: string;

  @Column({ length: 20, nullable: true })
  businessPhone?: string;

  @Column({ length: 500, nullable: true })
  businessLogoUrl?: string;

  @Column({ length: 100, nullable: true })
  taxNumber?: string;

  @Column({ length: 100, nullable: true })
  registrationNumber?: string;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.vendorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({})
  user!: User;
}
