import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  ILike,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
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

  private calculateEffectiveStock(product: Product): number {
    if (product.variants && product.variants.length > 0) {
      return product.variants.reduce(
        (sum, v) => sum + Number(v.stockQuantity || 0),
        0,
      );
    }
    return Number(product.stockQuantity || 0);
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
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query.page && query.page > 0 ? Number(query.page) : 1;
    const limit = query.limit && query.limit > 0 ? Number(query.limit) : 12;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.vendorId) where.vendorId = query.vendorId;
    if (query.status) where.status = query.status;
    if (query.search) where.name = ILike(`%${query.search}%`);

    if (query.minPrice !== undefined && query.maxPrice !== undefined) {
      where.price = Between(query.minPrice, query.maxPrice);
    } else if (query.minPrice !== undefined) {
      where.price = MoreThanOrEqual(query.minPrice);
    } else if (query.maxPrice !== undefined) {
      where.price = LessThanOrEqual(query.maxPrice);
    }

    let order: any = { createdAt: 'DESC' };
    if (query.sortBy === 'price_asc') order = { price: 'ASC' };
    if (query.sortBy === 'price_desc') order = { price: 'DESC' };
    if (query.sortBy === 'popular') order = { viewCount: 'DESC' };

    const [rawItems, total] = await this.productRepository.findAndCount({
      where,
      relations: {
        category: true,
        images: true,
        variants: true,
      },
      order,
      skip,
      take: limit,
    });

    const items = rawItems.map((product) => ({
      ...product,
      effectiveStockQuantity: this.calculateEffectiveStock(product),
    }));

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

    this.productRepository
      .increment({ id: product.id }, 'viewCount', 1)
      .catch(() => {});

    return {
      ...product,
      effectiveStockQuantity: this.calculateEffectiveStock(product),
    };
  }

  async findByVendor(vendorId: string) {
    const products = await this.productRepository.find({
      where: { vendorId },
      relations: {
        category: true,
        images: true,
        variants: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return products.map((p) => ({
      ...p,
      effectiveStockQuantity: this.calculateEffectiveStock(p),
    }));
  }

  async update(id: string, vendorId: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    if (product.vendorId !== vendorId) {
      throw new ForbiddenException(
        `You do not have permission to update this product`,
      );
    }

    Object.assign(product, dto);
    await this.productRepository.save(product);

    if (dto.imageUrls && dto.imageUrls.length > 0) {
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
      throw new ForbiddenException(
        `You do not have permission to delete this product`,
      );
    }

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  async createVariant(
    productId: string,
    vendorId: string,
    dto: CreateProductVariantDto,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorId !== vendorId)
      throw new ForbiddenException('Access denied');

    const variant = this.productVariantRepository.create({
      ...dto,
      productId,
      sku:
        dto.sku ||
        `${product.sku}-VAR-${Date.now().toString(36).toUpperCase()}`,
    });

    await this.productVariantRepository.save(variant);
    return this.findOne(productId);
  }

  async updateVariant(
    productId: string,
    variantId: string,
    vendorId: string,
    dto: UpdateProductVariantDto,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorId !== vendorId)
      throw new ForbiddenException('Access denied');

    const variant = await this.productVariantRepository.findOne({
      where: { id: variantId, productId },
    });
    if (!variant) throw new NotFoundException('Variant not found');

    Object.assign(variant, dto);
    await this.productVariantRepository.save(variant);
    return this.findOne(productId);
  }

  async deleteVariant(productId: string, variantId: string, vendorId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorId !== vendorId)
      throw new ForbiddenException('Access denied');

    const variant = await this.productVariantRepository.findOne({
      where: { id: variantId, productId },
    });
    if (!variant) throw new NotFoundException('Variant not found');

    await this.productVariantRepository.remove(variant);
    return this.findOne(productId);
  }
}
