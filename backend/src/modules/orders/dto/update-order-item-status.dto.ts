import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderItemStatusEnum } from '../../common/enums/erd.enums';

export class UpdateOrderItemStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderItemStatusEnum)
  status!: OrderItemStatusEnum;

  @IsOptional()
  @IsString()
  otp?: string;
}
