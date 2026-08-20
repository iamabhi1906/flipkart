import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryQueryDto } from './dto/query-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const parent = await this.findOne(createCategoryDto.parentId);
      if (!parent) throw new NotFoundException(`No parent found`);
    }
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(query: CategoryQueryDto) {
    const {
      page = 1,
      limit = 20,
      search,
      parentId,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;
    const qb = this.categoryRepository.createQueryBuilder('category');
    if (search)
      qb.andWhere(
        '(category.name ILIKE :search OR category.slug ILIKE :search)',
        { search: `%${search}%` },
      );

    if (parentId) {
      qb.andWhere('category.parentId = :parentId', { parentId });
    } else {
      qb.andWhere('category.parentId IS NULL');
    }

    qb.andWhere('category.isActive = true');
    qb.orderBy(`category.${sortBy}`, sortOrder);
    qb.skip((page - 1) * limit);
    qb.take(limit);
    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('No category found to update');
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async toggleStatus(id: string) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('No category found to update');
    if (category.isActive) category.isActive = false;
    else category.isActive = true;
    return await this.categoryRepository.save(category);
  }
}
