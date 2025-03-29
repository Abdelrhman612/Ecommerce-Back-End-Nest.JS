import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'The name field is required.'],
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    required: [true, 'The email field is required.'],
    unique: true,
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
  })
  email: string;

  @Prop({
    required: [true, 'The password field is required.'],
    type: String,
    minlength: [5, 'The password must be at least 5 characters long.'],
    maxlength: [20, 'The password must not exceed 20 characters.'],
  })
  password: string;

  @Prop({
    required: [true, 'The role field is required.'],
    enum: {
      values: ['User', 'Admin', 'Manager'],
      message: 'Invalid role. Accepted values are: User, Admin, Manager.',
    },
    type: String,
    default: 'User',
  })
  role: string;

  @Prop({ type: String, default: null })
  avatar: string;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
    match: [/^\d{11}$/, 'The phone number must be exactly 11 digits.'],
    trim: true,
  })
  phoneNumber: string;

  @Prop({ type: String, default: null, trim: true })
  address: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  active: boolean;

  @Prop({ type: String, default: null })
  verificationCode: string;

  @Prop({
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Invalid gender. Accepted values are: male, female.',
    },
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
