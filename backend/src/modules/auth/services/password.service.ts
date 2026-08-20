import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { UsersService } from 'src/modules/users/users.service';
import type { Repository } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;
  private readonly resetTokenTime = 15;

  constructor(
    private readonly userService: UsersService,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async createResetToken(userId: string) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    const expiresAt = new Date(Date.now() + this.resetTokenTime * 60 * 1000);
    const reset = this.passwordResetRepository.create({
      userId,
      tokenHash,
      expiresAt,
    });
    await this.passwordResetRepository.save(reset);
    return { token: rawToken, expiresAt };
  }

  async resetPassword(rawToken: string, newPassword: string) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const reset = await this.passwordResetRepository.findOne({
      where: { tokenHash },
    });

    if (!reset)
      throw new BadRequestException('Invalid or expired password reset token');

    if (reset.usedAt)
      throw new BadRequestException(
        'Password reset token has already been used',
      );

    if (reset.expiresAt.getTime() < Date.now())
      throw new BadRequestException('Password reset token has expired');

    const hashedPassword = await this.hashPassword(newPassword);
    await this.userService.update(reset.userId, { password: hashedPassword });
    reset.usedAt = new Date();
    await this.passwordResetRepository.save(reset);
    return { message: 'Password reset successfully' };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findOne(userId);
    if (!user.password)
      throw new UnauthorizedException('Current password is incorrect');
    const isValid = await this.comparePassword(currentPassword, user.password);
    if (!isValid)
      throw new UnauthorizedException('Current password is incorrect');
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userService.update(userId, { password: hashedPassword });
    return { message: 'Password changed successfully' };
  }
}
