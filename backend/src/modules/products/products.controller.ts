import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { Public } from '../common/decorators/public.decorator';
import { StorageService } from '../storage/storage.service';
import type { AuthenticatedRequest } from '../common/interfaces/auth-request.interface';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly storageService: StorageService,
  ) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const result = await this.storageService.uploadFile(file, 'flipkart_products');
    return {
      success: true,
      url: result.url,
    };
  }

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(req.user.id, createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  @Get('vendor/my-products')
  findMyProducts(@Req() req: AuthenticatedRequest) {
    return this.productsService.findByVendor(req.user.id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, req.user.id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.productsService.remove(id, req.user.id);
  }

  @Post(':productId/variants')
  createVariant(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateProductVariantDto,
  ) {
    return this.productsService.createVariant(productId, req.user.id, dto);
  }

  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateProductVariantDto,
  ) {
    return this.productsService.updateVariant(productId, variantId, req.user.id, dto);
  }

  @Delete(':productId/variants/:variantId')
  deleteVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.productsService.deleteVariant(productId, variantId, req.user.id);
  }
}
