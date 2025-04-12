import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/schemas/category.schema';
import { subCategory } from 'src/sub-catergory/schemas/sub-category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: [true, 'The title field is required.'],
    type: String,
    min: [3, 'title of product last 3 characters'],
  })
  title: string;
  @Prop({
    required: [true, 'The description field is required.'],
    type: String,
    min: [20, 'description of product last 20 characters'],
  })
  description: string;
  @Prop({
    required: [true, 'The quantity field is required.'],
    type: Number,
    default: 1,
  })
  quantity: number;
  @Prop({
    required: [true, 'The imageCover field is required.'],
    type: String,
  })
  imageCover: string;
  @Prop({
    type: Array,
  })
  image: string[];
  @Prop({
    type: Number,
    default: 0,
  })
  sold: number;
  @Prop({
    required: true,
    type: Number,
    min: [1, 'Price must be at least 1 L.E'],
  })
  price: number;
  @Prop({
    type: Number,
    min: [1, 'PriceDescount must be at least 1 L.E'],
  })
  priceAfterdescount: number;
  @Prop({
    type: Array,
  })
  colors: string[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Category.name,
  })
  category: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: subCategory.name,
  })
  subCategory: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: Brand.name,
  })
  brand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
