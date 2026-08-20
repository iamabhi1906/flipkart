import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendOtpEmail(toEmail: string, otp: string): Promise<boolean> {
    try {
      const from =
        this.configService.get<string>('SMTP_FROM') || 'noreply@example.com';
      await this.mailerService.sendMail({
        to: toEmail,
        from,
        subject: 'Your Login Verification Code',
        text: `Your verification code is: ${otp}. It will expire in 5 minutes. Do not share this code with anyone.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2874f0; text-align: center;">Verification Code</h2>
            <p style="font-size: 16px; color: #333;">Your 6-digit verification code is:</p>
            <div style="background-color: #f4f4f4; border-radius: 6px; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2874f0; margin: 20px 0;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: #666;">This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        `,
      });
      this.logger.log(`OTP sent to ${toEmail}`);
      return true;
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(
          `Failed to send OTP email to ${toEmail}: ${error.message}`,
        );
      else this.logger.error(error);
      return false;
    }
  }
}
