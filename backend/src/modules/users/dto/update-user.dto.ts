import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'email',
    'mobileNumber',
    'password',
    'authProvider',
    'googleId',
  ] as const),
) {}
