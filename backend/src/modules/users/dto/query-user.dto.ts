import {
  IsOptional,
  IsPositive,
  IsInt,
  IsString,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import UserStatusEnum from '../enums/user.status';

export class FindAllQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(UserStatusEnum)
  status!: UserStatusEnum;
}
