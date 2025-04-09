import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Coupon & Document;

@Schema({ timestamps: true })
export class Coupon {
  @Prop({
    required: [true, 'The name field is required.'],
    type: String,
    trim: true,
  })
  name: string;
  @Prop({ type: Date, required: true })
  expireDate: Date;
  @Prop({ type: Number, required: true })
  discount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
