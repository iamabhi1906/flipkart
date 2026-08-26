import { Controller, Get, Post, Patch, Body, Param, Req } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UpdateVendorStatusDto } from './dto/update-vendor-status.dto';
import type { AuthenticatedRequest } from '../common/interfaces/auth-request.interface';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post('become-vendor')
  becomeVendor(@Req() req: AuthenticatedRequest, @Body() dto: CreateVendorDto) {
    return this.vendorsService.becomeVendor(req.user.id, dto);
  }

  @Get('me')
  getVendorProfile(@Req() req: AuthenticatedRequest) {
    return this.vendorsService.getVendorProfile(req.user.id);
  }

  @Patch('me')
  updateVendorProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateVendorDto,
  ) {
    return this.vendorsService.updateVendorProfile(req.user.id, dto);
  }

  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateVendorStatusDto) {
    return this.vendorsService.updateVendorStatus(id, dto.status);
  }
}
