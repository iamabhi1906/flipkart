import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const count = await this.addressRepository.count({ where: { userId } });
    const isFirstAddress = count === 0;

    if (createAddressDto.isDefault || isFirstAddress) {
      await this.addressRepository.update({ userId }, { isDefault: false });
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      userId,
      isDefault: createAddressDto.isDefault ?? isFirstAddress,
    });

    return await this.addressRepository.save(address);
  }

  async findAllForUser(userId: string): Promise<Address[]> {
    return await this.addressRepository.find({
      where: { userId },
      order: {
        isDefault: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id, userId },
    });
    if (!address) {
      throw new NotFoundException(`Address not found`);
    }
    return address;
  }

  async update(
    id: string,
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id, userId);

    if (updateAddressDto.isDefault) {
      await this.addressRepository.update({ userId }, { isDefault: false });
    }

    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  async setDefault(id: string, userId: string): Promise<Address> {
    const address = await this.findOne(id, userId);
    await this.addressRepository.update({ userId }, { isDefault: false });
    address.isDefault = true;
    return await this.addressRepository.save(address);
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const address = await this.findOne(id, userId);
    const wasDefault = address.isDefault;
    await this.addressRepository.remove(address);

    if (wasDefault) {
      const firstRemaining = await this.addressRepository.findOne({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
      if (firstRemaining) {
        firstRemaining.isDefault = true;
        await this.addressRepository.save(firstRemaining);
      }
    }

    return { message: 'Address removed successfully' };
  }
}
