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
        template: 'otp',
        context: {
          otp,
        },
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

  async sendDeliveryOtpEmail(
    toEmail: string,
    customerName: string,
    orderNumber: string,
    productName: string,
    otp: string,
  ): Promise<boolean> {
    try {
      const from =
        this.configService.get<string>('SMTP_FROM') || 'noreply@example.com';
      await this.mailerService.sendMail({
        to: toEmail,
        from,
        subject: `Delivery OTP for Order #${orderNumber || ''}`,
        template: 'delivery-otp',
        context: {
          customerName: customerName || 'Valued Customer',
          orderNumber: orderNumber || 'N/A',
          productName: productName || 'Product',
          otp: otp || '',
        },
      });

      this.logger.log(
        `Delivery OTP sent to ${toEmail} for order ${orderNumber || ''}`,
      );
      return true;
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(
          `Failed to send delivery OTP email to ${toEmail}: ${error.message}`,
        );
      else this.logger.error(error);
      return false;
    }
  }
}
