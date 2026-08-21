import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { OtpChallenge } from './entities/otp-challenge.entity';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';
import { MailService } from './services/mail.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    TokenModule,
    TypeOrmModule.forFeature([OtpChallenge]),
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
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieService, MailService, JwtStrategy],
  exports: [AuthService, MailService, PassportModule, JwtStrategy],
})
export class AuthModule {}
