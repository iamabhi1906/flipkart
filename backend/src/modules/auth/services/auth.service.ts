import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import UserStatusEnum from '../../users/enums/user.status';
import { TokenService } from 'src/modules/token/token.service';
import { CookieService } from './cookie.service';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly cookiesService: CookieService,
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
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');
    if (user.status === UserStatusEnum.DISABLED || UserStatusEnum.SUSPENDED)
      throw new UnauthorizedException('you account disabled or suspended');
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
}
