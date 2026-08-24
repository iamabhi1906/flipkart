import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import type { DeepPartial, Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import type { FindAllQueryDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    const userProfile = this.userProfileRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      avatar: createUserDto.avatar,
      dateOfBirth: createUserDto.dateOfBirth,
      gender: createUserDto.gender,
      userId: user.id,
    });
    await this.userProfileRepository.save(userProfile);
    return { ...user, profile: userProfile };
  }

  async createPasswordlessUser(email: string) {
    const user = this.userRepository.create({
      email,
    });
    await this.userRepository.save(user);
    const firstName = email.split('@')[0];
    const userProfile = this.userProfileRepository.create({
      firstName,
      userId: user.id,
    });
    await this.userProfileRepository.save(userProfile);
    return { ...user, profile: userProfile };
  }

  async findAll(query: FindAllQueryDto) {
    const { page = 1, limit = 10, search, status } = query;
    const skip = (page - 1) * limit;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (status) queryBuilder.andWhere('user.status = :status', { status });
    if (search) {
      queryBuilder.andWhere(
        `(
          user.email ILIKE :search
          OR user.mobileNumber ILIKE :search
          OR profile.firstName ILIKE :search
          OR profile.lastName ILIKE :search
        )`,
        { search: `%${search}%` },
      );
    }

    const [users, total] = await queryBuilder.getManyAndCount();
    return {
      data: users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) throw new NotFoundException(`User with id: ${id}, not found`);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.profile = { ...user.profile, ...updateUserDto };
    const data = await this.userProfileRepository.save(user.profile);
    return user;
  }

  async updateFullProfile(id: string, dto: any) {
    const user = await this.findOne(id);

    if (dto.email && dto.email !== user.email) {
      user.email = dto.email;
    }
    if (dto.mobileNumber !== undefined) {
      user.mobileNumber = dto.mobileNumber;
    }
    await this.userRepository.save(user);

    if (!user.profile) {
      user.profile = this.userProfileRepository.create({ userId: user.id });
    }
    if (dto.firstName !== undefined) user.profile.firstName = dto.firstName;
    if (dto.lastName !== undefined) user.profile.lastName = dto.lastName;
    if (dto.gender !== undefined) user.profile.gender = dto.gender;

    await this.userProfileRepository.save(user.profile);
    return this.findOne(id);
  }

  async update(id: string, data: DeepPartial<User>) {
    const user = await this.findOne(id);
    const merged = this.userRepository.merge(user, data);
    return await this.userRepository.save(merged);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }

  async updateLastLogin(id: string, time: Date) {
    return await this.userRepository.update(id, { lastLoginAt: time });
  }
}
