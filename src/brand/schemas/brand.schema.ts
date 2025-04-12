import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({
    required: [true, 'The name field is required.'],
    type: String,
    trim: true,
  })
  name: string;
  @Prop({ type: String })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
