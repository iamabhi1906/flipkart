import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import type { AuthenticatedRequest } from '../common/interfaces/auth-request.interface';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create(req.user.id, createAddressDto);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.addressesService.findAllForUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.addressesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, req.user.id, updateAddressDto);
  }

  @Put(':id')
  putUpdate(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, req.user.id, updateAddressDto);
  }

  @Patch(':id/set-default')
  setDefault(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.addressesService.setDefault(id, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.addressesService.remove(id, req.user.id);
  }
}
