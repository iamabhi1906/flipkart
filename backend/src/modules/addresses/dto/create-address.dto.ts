import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AddressTypeEnum } from '../../common/enums/erd.enums';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber!: string;

  @IsNotEmpty()
  @IsString()
  postalCode!: string;

  @IsNotEmpty()
  @IsString()
  addressLine1!: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  landmark?: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(AddressTypeEnum)
  addressType?: AddressTypeEnum;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
