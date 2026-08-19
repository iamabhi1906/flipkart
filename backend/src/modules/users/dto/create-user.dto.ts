import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import UserGenderEnum from '../enums/user.gender';
import AuthProviderEnum from 'src/modules/auth/enums/auth.provider';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsEnum(AuthProviderEnum)
  authProvider?: AuthProviderEnum;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(UserGenderEnum)
  gender?: UserGenderEnum;
}
