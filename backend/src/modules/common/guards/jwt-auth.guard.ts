/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import {
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard reached');

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('isPublic:', isPublic);

    if (isPublic) {
      console.log('Skipping JWT because route is public');
      return true;
    }

    console.log('Calling Passport JWT');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('handleRequest');
    console.log('user:', user);
    console.log('err:', err);
    console.log('info:', info);

    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Invalid or missing authentication token')
      );
    }

    return user;
  }
}
