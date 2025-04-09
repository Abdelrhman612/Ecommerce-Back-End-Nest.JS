import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schemas/brand.schema';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private BrandModel: Model<Brand>) {}
  async createBrand(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const Brand = await this.BrandModel.findOne({ name }).select('-__v');
    if (Brand) {
      throw new HttpException('Brand Already exist', 400);
    }
    const AddBrand = await this.BrandModel.create(createBrandDto);

    return { status: 'success', data: AddBrand };
  }

  async findAll() {
    const Brands = await this.BrandModel.find().select('-__v');
    return { status: 'success', length: Brands.length, data: Brands };
  }

  async findOne(_id: string) {
    const Brand = await this.BrandModel.findById({ _id }).select('-__v');
    if (!Brand) {
      throw new NotFoundException('Brand is not found');
    }
    return { status: 'success', data: Brand };
  }

  async updateBrand(_id: string, updateBrandDto: UpdateBrandDto) {
    const Brand = await this.BrandModel.findById({ _id }).select('-__v');
    if (!Brand) {
      throw new NotFoundException('Brand is not found');
    }
    const NewBrand = await this.BrandModel.findByIdAndUpdate(
      _id,
      updateBrandDto,
    ).select('-__v');
    return { status: 'success', data: NewBrand };
  }

  async remove(_id: string) {
    const Brand = await this.BrandModel.findById({ _id }).select('-__v');
    if (!Brand) {
      throw new NotFoundException('Brand is not found');
    }
    await this.BrandModel.deleteOne({ _id }).select('-__v');
    return { status: 'success', message: 'Delete Brand is successfully' };
  }
}
