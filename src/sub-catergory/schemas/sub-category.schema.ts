import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type subCategoryDocument = subCategory & Document;

@Schema({ timestamps: true })
export class subCategory {
  @Prop({
    required: [true, 'The name field is required.'],
    type: String,
    trim: true,
  })
  name: string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: Category.name, required: true })
  category: string;
}

export const subCategorySchema = SchemaFactory.createForClass(subCategory);
