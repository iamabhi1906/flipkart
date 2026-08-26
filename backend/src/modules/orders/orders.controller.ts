import { Controller, Get, Post, Patch, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';
import { UpdateOrderItemStatusDto } from './dto/update-order-item-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { AuthenticatedRequest } from '../common/interfaces/auth-request.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Req() req: AuthenticatedRequest, @Body() dto: CheckoutDto) {
    return this.ordersService.checkout(req.user.id, dto);
  }

  @Get('my-orders')
  findMyOrders(@Req() req: AuthenticatedRequest) {
    return this.ordersService.findMyOrders(req.user.id);
  }

  @Get('vendor/items')
  findVendorOrderItems(@Req() req: AuthenticatedRequest) {
    return this.ordersService.findVendorOrderItems(req.user.id);
  }

  @Patch('vendor/items/:itemId/status')
  updateVendorOrderItemStatus(
    @Param('itemId') itemId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateOrderItemStatusDto,
  ) {
    return this.ordersService.updateVendorOrderItemStatus(
      req.user.id,
      itemId,
      dto.status,
    );
  }

  @Get('admin/all')
  findAllOrdersForAdmin() {
    return this.ordersService.findAllOrdersForAdmin();
  }

  @Patch('admin/:id/status')
  updateOrderStatusByAdmin(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatusByAdmin(id, dto.status);
  }

  @Post(':id/cancel')
  cancelOrder(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.ordersService.cancelOrder(req.user.id, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.ordersService.findOne(id, req.user.id);
  }
}
