import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCatergoryDto } from './dto/create-sub-catergory.dto';
import { UpdateSubCatergoryDto } from './dto/update-sub-catergory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { subCategory } from './schemas/sub-category.schema';
import { Model } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

@Injectable()
export class SubCatergoryService {
  constructor(
    @InjectModel(subCategory.name) private subCategoryModel: Model<subCategory>,
    @InjectModel(Category.name) private CatgoryModel: Model<Category>,
  ) {}
  async CreateSubCategory(createSubCatergoryDto: CreateSubCatergoryDto) {
    const { name } = createSubCatergoryDto;
    const SubCategory = await this.subCategoryModel.findOne({ name });
    if (SubCategory) {
      throw new NotFoundException('sub-Category Already exist');
    }
    const category = await this.CatgoryModel.findById(
      createSubCatergoryDto.category,
    );
    if (!category) {
      throw new NotFoundException('category is not found');
    }
    const AddsubCategory = await this.subCategoryModel.create(
      createSubCatergoryDto,
    );

    return { status: 'success', data: AddsubCategory };
  }

  async findAll() {
    const SubCategory = await this.subCategoryModel
      .find()
      .select('-__v')
      .populate('category');
    return { status: 'success', data: SubCategory };
  }

  async findOne(_id: string) {
    const SubCategory = await this.subCategoryModel
      .findById({ _id })
      .select('-__v')
      .populate('category');
    if (!SubCategory) {
      throw new NotFoundException('subCategory is not found');
    }
    return { status: 'success', data: SubCategory };
  }

  async updateSubCategory(
    _id: string,
    updateSubCatergoryDto: UpdateSubCatergoryDto,
  ) {
    const SubCategory = await this.subCategoryModel.findById({ _id });
    if (!SubCategory) {
      throw new NotFoundException('subCategory is not found');
    }
    const NewSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(_id, updateSubCatergoryDto)
      .select('-__v');
    return { status: 'success', data: NewSubCategory };
  }

  async remove(_id: string) {
    const SubCategory = await this.subCategoryModel.findById({ _id });
    if (!SubCategory) {
      throw new NotFoundException('subCategory is not found');
    }
    await this.subCategoryModel.findByIdAndDelete({ _id });
    return { status: 'success', message: 'Delete SubCtegory successfully' };
  }
}
