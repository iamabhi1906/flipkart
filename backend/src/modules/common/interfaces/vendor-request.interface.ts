import { VendorProfile } from 'src/modules/vendors/entities/vendor.entity';
import { AuthenticatedRequest } from './auth-request.interface';

export interface VendorRequest extends AuthenticatedRequest {
  vendor: VendorProfile;
}
