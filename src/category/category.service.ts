import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CatgoryModel: Model<Category>,
  ) {}
  async createCatgory(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const Category = await this.CatgoryModel.findOne({ name: name }).select(
      '-__v',
    );
    if (Category) {
      throw new HttpException('catgory already exist', 400);
    }
    const AddCategory = await this.CatgoryModel.create(createCategoryDto);
    return { status: 'success', data: AddCategory };
  }

  async findAll(query: { name: string }) {
    const { name } = query;
    const Categories = await this.CatgoryModel.find()
      .select('-__v')
      .where('name', new RegExp(name, 'i'));
    return { status: 'success', length: Categories.length, data: Categories };
  }

  async findCategory(id: string) {
    const Category = await this.CatgoryModel.findById(id).select('-__v');
    if (!Category) {
      throw new NotFoundException('Catgory is not found');
    }
    return { status: 'success', data: Category };
  }

  async updateCatgory(_id: string, updateCategoryDto: UpdateCategoryDto) {
    const Category = await this.CatgoryModel.findOne({ _id });
    if (!Category) {
      throw new NotFoundException('Category is not found');
    }
    const NewCategory = await this.CatgoryModel.findByIdAndUpdate(
      { _id },
      updateCategoryDto,
      { new: true },
    ).select('-__v');
    return { status: 'success', data: NewCategory };
  }

  async DeleteCatgory(_id: string) {
    const Category = await this.CatgoryModel.findOne({ _id }).select('-__v');
    if (!Category) {
      throw new NotFoundException('Category is not found');
    }
    await this.CatgoryModel.deleteOne({ _id });
    return { status: 'success', message: 'Delete Catbory is successfully' };
  }
}
