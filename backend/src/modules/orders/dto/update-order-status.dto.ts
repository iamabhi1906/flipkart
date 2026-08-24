import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../../common/enums/erd.enums';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status!: OrderStatusEnum;
}
