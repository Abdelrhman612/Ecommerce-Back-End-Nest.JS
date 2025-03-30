/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as validate from 'class-validator';
export class SignUpdto {
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
}
export class SignIndto {
  @validate.IsEmail({}, { message: 'Email must be a valid email address' })
  @validate.IsNotEmpty({ message: 'Email is required' })
  email: string;
  @validate.IsString({ message: 'Password must be a string' })
  @validate.IsNotEmpty({ message: 'Password is required' })
  password: string;
}
