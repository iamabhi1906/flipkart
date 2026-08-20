import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('otp_challenges')
export class OtpChallenge {
  @PrimaryGeneratedColumn()
  id!: string;

  @Index()
  @Column()
  email!: string;

  @Column({})
  otpHash!: string;

  @Index()
  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ type: 'boolean', default: false })
  used!: boolean;

  @Column({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({})
  updatedAt!: Date;
}
