import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({})
  userId!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ length: 100, nullable: true })
  type?: string;

  @Column({ nullable: true })
  referenceId?: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({})
  user!: User;
}
