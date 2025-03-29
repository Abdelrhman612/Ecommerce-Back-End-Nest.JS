/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString({ message: 'Role must be a string' })
  @IsIn(['Admin', 'User', 'Manager'], {
    message: 'Role must be one of: admin, user, manager',
  })
  role: string;

  @IsString({ message: 'Avatar must be a string (URL or path)' })
  @IsOptional()
  avatar?: string;

  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @IsString({ message: 'phoneNumber must be a string' })
  phoneNumber: string;

  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsBoolean({ message: 'Active must be a boolean (true/false)' })
  active: boolean;

  @IsString({ message: 'Verification code must be a string' })
  @IsOptional()
  verificationCode?: string;

  @IsString({ message: 'Gender must be a string' })
  @IsIn(['male', 'female'], {
    message: 'Gender must be one of: male, female',
  })
  gender: string;
}
