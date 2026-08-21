import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VendorsService } from 'src/modules/vendors/vendors.service';
import { VENDOR } from '../decorators/vendor.decorator';
import { VendorRequest } from '../interfaces/vendor-request.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly vendorService: VendorsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      VENDOR,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest<VendorRequest>();
    const vendor = await this.vendorService.findOne(request.user.id);

    if (!vendor) {
      throw new ForbiddenException(
        'Need vendor permission to perform this action',
      );
    }
    request.vendor = vendor;
    return true;
  }
}
