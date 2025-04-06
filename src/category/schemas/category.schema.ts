import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: [true, 'The name field is required.'],
    type: String,
    trim: true,
  })
  name: string;
  @Prop({ type: String })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
