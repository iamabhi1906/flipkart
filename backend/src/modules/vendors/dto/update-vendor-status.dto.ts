import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatusEnum } from '../../common/enums/erd.enums';

export class UpdateVendorStatusDto {
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status!: UserStatusEnum;
}
