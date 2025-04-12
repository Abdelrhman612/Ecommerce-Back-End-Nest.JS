/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}
  async createProduct(createProductDto: CreateProductDto) {
    const { title } = createProductDto;
    const product = await this.ProductModel.findOne({ title });
    if (product) {
      throw new HttpException('product Already exist', 400);
    }
    const AddProduct = await this.ProductModel.create(createProductDto);

    return { status: 'success', data: AddProduct };
  }

  async findAll(query) {
    const { limit = 1000_000_000, skip = 0, sort = 'asc' } = query;

    if (Number.isNaN(Number(+limit))) {
      throw new HttpException('Invalid limit', 400);
    }
    if (Number.isNaN(Number(+skip))) {
      throw new HttpException('Invalid skip', 400);
    }
    if (!['asc', 'desc'].includes(sort)) {
      throw new HttpException('Invalid sort', 400);
    }
    const products = await this.ProductModel.find()
      .select('-__v')
      .lean()
      .skip(skip)
      .limit(limit)
      .sort({ title: sort })
      .populate('category')
      .populate('subCategory')
      .populate('brand');

    return { status: 'success', length: products.length, data: products };
  }

  async findOne(_id: string) {
    const product = await this.ProductModel.findById({ _id })
      .select('-__v')
      .populate('category')
      .populate('subCategory')
      .populate('brand');
    if (!product) {
      throw new NotFoundException('Product is not found');
    }
    return { status: 'success', data: product };
  }

  async updateProduct(_id: string, updateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findById({ _id });
    if (!product) {
      throw new NotFoundException('Product is not found');
    }
    const NewProduct = await this.ProductModel.findByIdAndUpdate(
      _id,
      updateProductDto,
    )
      .select('-__v')
      .populate('category')
      .populate('subCategory')
      .populate('brand');
    return { status: 'success', data: NewProduct };
  }

  async remove(_id: string) {
    const product = await this.ProductModel.findById({ _id })
      .select('-__v')
      .populate('category')
      .populate('subCategory')
      .populate('brand');
    if (!product) {
      throw new NotFoundException('Product is not found');
    }
    await this.ProductModel.deleteOne({ _id });
    return { status: 'success', message: 'delete product is successfully' };
  }
}
