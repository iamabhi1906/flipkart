import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { MailService } from './mail.service';

const getTemplateDir = () => {
  const distTemplates = join(__dirname, '..', '..', 'templates');
  if (existsSync(distTemplates)) return distTemplates;
  const srcTemplates = join(process.cwd(), 'src', 'templates');
  if (existsSync(srcTemplates)) return srcTemplates;
  return join(process.cwd(), 'templates');
};

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST', 'smtp.gmail.com'),
          port: config.get<number>('SMTP_PORT', 587),
          secure: false,
          auth: {
            user: config.get<string>('SMTP_USER', ''),
            pass: config.get<string>('SMTP_PASS', ''),
          },
        },
        defaults: {
          from: config.get<string>('SMTP_FROM', 'noreply@example.com'),
        },
        template: {
          dir: getTemplateDir(),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService, MailerModule],
})
export class MailModule {}
