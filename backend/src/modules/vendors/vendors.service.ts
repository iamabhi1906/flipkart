import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorProfile } from './entities/vendor.entity';
import { User } from '../users/entities/user.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UserRoleEnum } from '../common/enums/erd.enums';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(VendorProfile)
    private readonly vendorRepository: Repository<VendorProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async becomeVendor(userId: string, dto: CreateVendorDto) {
    let vendorProfile = await this.vendorRepository.findOne({ where: { userId } });

    if (vendorProfile) {
      Object.assign(vendorProfile, dto);
    } else {
      vendorProfile = this.vendorRepository.create({
        ...dto,
        userId,
        isVerified: true,
      });
    }

    await this.vendorRepository.save(vendorProfile);

    // Update user role to VENDOR
    await this.userRepository.update(userId, { role: UserRoleEnum.VENDOR });

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: { profile: true, vendorProfile: true },
    });

    return {
      message: 'Vendor profile registered successfully!',
      vendorProfile,
      user: updatedUser,
    };
  }

  async getVendorProfile(userId: string) {
    const profile = await this.vendorRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Vendor profile not found');
    }
    return profile;
  }

  async findAll() {
    return await this.vendorRepository.find({ relations: { user: true } });
  }

  async findOne(id: string) {
    const profile = await this.vendorRepository.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Vendor profile not found');
    return profile;
  }
}
