import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './services/auth.service';
import type { AuthenticatedRequest } from '../common/interfaces/auth-request.interface';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return this.authService.requestOtp(requestOtpDto);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.verifyOtp(verifyOtpDto, response);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(body.email, body.password, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    return 'Logout successfully';
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.refresh(request, response);
  }

  @Get('me')
  @Public(false)
  async getCurrentUser(@Req() request: AuthenticatedRequest) {
    return request.user;
  }
}
