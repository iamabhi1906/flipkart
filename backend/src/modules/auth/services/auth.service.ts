import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import type { Response, Request } from 'express';
import { Repository } from 'typeorm';
import { TokenService } from '../../token/token.service';
import UserStatusEnum from '../../users/enums/user.status';
import { UsersService } from '../../users/users.service';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { ResendOtpDto } from '../dto/resend-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { OtpChallenge } from '../entities/otp-challenge.entity';
import { CookieService } from './cookie.service';
import { MailService } from '../../mail/mail.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_VERIFICATION_ATTEMPTS = 5;
const MAX_OTP_REQUESTS_PER_HOUR = 5;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OtpChallenge)
    private readonly otpChallengeRepository: Repository<OtpChallenge>,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly cookiesService: CookieService,
    private readonly mailService: MailService,
  ) {}

  async register(data: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(data.email);
    if (existingUser)
      throw new ConflictException('Email or mobile number already exists');
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = this.userService.create({ ...data, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string, response: Response) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.password) throw new UnauthorizedException('Invalid credentials');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');
    if (
      user.status === UserStatusEnum.DISABLED ||
      user.status === UserStatusEnum.SUSPENDED
    )
      throw new UnauthorizedException('Your account is disabled or suspended');
    await this.userService.updateLastLogin(user.id, new Date());
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const tokens = await this.tokenService.generateTokenPair(payload);
    this.cookiesService.setAuthCookies(
      response,
      tokens.accessToken,
      tokens.refreshToken,
    );
    return {
      user: {
        id: user.id,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async requestOtp(requestOtpDto: RequestOtpDto) {
    const email = requestOtpDto.email.trim().toLowerCase();
    const now = new Date();
    const latestChallenge = await this.otpChallengeRepository.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });

    if (
      latestChallenge &&
      now.getTime() - new Date(latestChallenge.createdAt).getTime() <
        RESEND_COOLDOWN_MS
    ) {
      throw new HttpException(
        'Please wait 60 seconds before requesting another code.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const hourlyRequestCount = await this.otpChallengeRepository
      .createQueryBuilder('otp')
      .where('otp.email = :email', { email })
      .andWhere('otp.created_at >= :oneHourAgo', { oneHourAgo })
      .getCount();

    if (hourlyRequestCount >= MAX_OTP_REQUESTS_PER_HOUR) {
      throw new HttpException(
        'Too many verification code requests for this email. Please try again in an hour.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    await this.otpChallengeRepository.update(
      { email, used: false },
      { used: true },
    );
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MS);
    const otpChallenge = this.otpChallengeRepository.create({
      email,
      otpHash,
      expiresAt,
      attempts: 0,
      used: false,
    });
    await this.otpChallengeRepository.save(otpChallenge);
    this.mailService.sendOtpEmail(email, otp).catch(() => {});
    return {
      success: true,
      message: 'If this email is valid, a verification code has been sent.',
    };
  }

  async resendOtp(resendOtpDto: ResendOtpDto) {
    return this.requestOtp({ email: resendOtpDto.email });
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, response?: Response) {
    const email = verifyOtpDto.email.trim().toLowerCase();
    const now = new Date();
    const challenge = await this.otpChallengeRepository.findOne({
      where: { email, used: false },
      order: { createdAt: 'DESC' },
    });

    if (!challenge) {
      throw new BadRequestException('Invalid or expired verification code');
    }
    if (new Date(challenge.expiresAt) <= now) {
      throw new BadRequestException(
        'Verification code has expired. Please request a new code.',
      );
    }

    if (challenge.attempts >= MAX_VERIFICATION_ATTEMPTS) {
      throw new BadRequestException(
        'Maximum verification attempts exceeded. Please request a new code.',
      );
    }

    const isValid = await bcrypt.compare(verifyOtpDto.otp, challenge.otpHash);
    if (!isValid) {
      challenge.attempts += 1;
      await this.otpChallengeRepository.save(challenge);
      throw new BadRequestException('Invalid verification code');
    }

    challenge.used = true;
    await this.otpChallengeRepository.save(challenge);

    let user = await this.userService.findOneByEmail(email);
    if (user) {
      if (
        user.status === UserStatusEnum.DISABLED ||
        user.status === UserStatusEnum.SUSPENDED
      ) {
        throw new UnauthorizedException(
          'Your account is disabled or suspended',
        );
      }
    } else {
      user = await this.userService.createPasswordlessUser(email);
    }

    await this.userService.updateLastLogin(user.id, now);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const tokens = await this.tokenService.generateTokenPair(payload);

    if (response) {
      this.cookiesService.setAuthCookies(
        response,
        tokens.accessToken,
        tokens.refreshToken,
      );
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  logout(response: Response) {
    this.cookiesService.clearAuthCookies(response);
  }

  async refresh(request: Request, response: Response) {
    const payload = await this.tokenService.verifyRefreshToken(
      request?.cookies?.refresh_token,
    );
    const accessToken = await this.tokenService.generateAccessToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });
    await this.cookiesService.setAccessToken(response, accessToken);
    return { accessToken };
  }
}
