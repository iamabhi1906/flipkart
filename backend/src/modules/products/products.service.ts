import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatusEnum } from '../common/enums/erd.enums';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
  ) {}

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  async create(vendorId: string, dto: CreateProductDto) {
    const baseSlug = this.slugify(dto.name);
    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${uniqueSuffix}`;
    const sku = dto.sku || `SKU-${Date.now().toString(36).toUpperCase()}`;

    const product = this.productRepository.create({
      ...dto,
      vendorId,
      slug,
      sku,
      status: dto.status || ProductStatusEnum.ACTIVE,
      stockQuantity: dto.stockQuantity ?? 10,
    });

    const savedProduct = await this.productRepository.save(product);

    if (dto.imageUrls && dto.imageUrls.length > 0) {
      const images = dto.imageUrls.map((url, index) =>
        this.productImageRepository.create({
          productId: savedProduct.id,
          imageUrl: url,
          sortOrder: index + 1,
          isPrimary: index === 0,
        }),
      );
      await this.productImageRepository.save(images);
    }

    return this.findOne(savedProduct.id);
  }

  async findAll(query: {
    categoryId?: string;
    vendorId?: string;
    search?: string;
    status?: ProductStatusEnum;
    page?: number;
    limit?: number;
  }) {
    const page = query.page && query.page > 0 ? Number(query.page) : 1;
    const limit = query.limit && query.limit > 0 ? Number(query.limit) : 12;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.vendorId) {
      where.vendorId = query.vendorId;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }

    const [items, total] = await this.productRepository.findAndCount({
      where,
      relations: {
        category: true,
        images: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: [{ id }, { slug: id }],
      relations: {
        category: true,
        images: true,
        variants: true,
        vendor: {
          profile: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID/slug "${id}" not found`);
    }

    // Increment view count asynchronously
    this.productRepository.increment({ id: product.id }, 'viewCount', 1).catch(() => {});

    return product;
  }

  async findByVendor(vendorId: string) {
    return await this.productRepository.find({
      where: { vendorId },
      relations: {
        category: true,
        images: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, vendorId: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    if (product.vendorId !== vendorId) {
      throw new ForbiddenException(`You do not have permission to update this product`);
    }

    Object.assign(product, dto);
    await this.productRepository.save(product);

    if (dto.imageUrls && dto.imageUrls.length > 0) {
      // Remove old images and save new ones
      await this.productImageRepository.delete({ productId: id });
      const images = dto.imageUrls.map((url, index) =>
        this.productImageRepository.create({
          productId: id,
          imageUrl: url,
          sortOrder: index + 1,
          isPrimary: index === 0,
        }),
      );
      await this.productImageRepository.save(images);
    }

    return this.findOne(id);
  }

  async remove(id: string, vendorId: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    if (product.vendorId !== vendorId) {
      throw new ForbiddenException(`You do not have permission to delete this product`);
    }

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
