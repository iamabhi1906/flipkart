import { SetMetadata } from '@nestjs/common';

export const VENDOR = 'vendor';
export const VendorPermissions = (...permissions: string[]) =>
  SetMetadata(VENDOR, permissions);
