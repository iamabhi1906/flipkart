import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './auth.controller';
import { OtpChallenge } from './entities/otp-challenge.entity';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    TokenModule,
    MailModule,
    TypeOrmModule.forFeature([OtpChallenge]),
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtStrategy],
})
export class AuthModule {}
