/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as validate from 'class-validator';

export class CreateUserDto {
  @validate.IsString({ message: 'Name must be a string' })
  @validate.IsNotEmpty({ message: 'Name is required' })
  name: string;

  @validate.IsEmail({}, { message: 'Email must be a valid email address' })
  @validate.IsNotEmpty({ message: 'Email is required' })
  email: string;

  @validate.IsString({ message: 'Password must be a string' })
  @validate.IsNotEmpty({ message: 'Password is required' })
  password: string;

  @validate.IsString({ message: 'Role must be a string' })
  @validate.IsIn(['Admin', 'User', 'Manager'], {
    message: 'Role must be one of: admin, user, manager',
  })
  @validate.IsOptional()
  role: string;

  @validate.IsString({ message: 'Avatar must be a string (URL or path)' })
  @validate.IsOptional()
  avatar?: string;

  @validate.IsNumber({}, { message: 'Age must be a number' })
  @validate.IsOptional()
  age: number;

  @validate.IsString({ message: 'phoneNumber must be a string' })
  @validate.IsOptional()
  phoneNumber: string;

  @validate.IsString({ message: 'Address must be a string' })
  @validate.IsOptional()
  address: string;

  @validate.IsBoolean({ message: 'Active must be a boolean (true/false)' })
  @validate.IsOptional()
  active: boolean;

  @validate.IsString({ message: 'Verification code must be a string' })
  @validate.IsOptional()
  verificationCode?: string;

  @validate.IsString({ message: 'Gender must be a string' })
  @validate.IsIn(['male', 'female'], {
    message: 'Gender must be one of: male, female',
  })
  gender: string;
}
