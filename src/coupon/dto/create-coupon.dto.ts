import { IsNumber, IsString } from 'class-validator';
import { IsFutureDate } from '../decorator/coupon.decorator';

export class CreateCouponDto {
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsFutureDate({ message: 'expireDate must be in the future' })
  expireDate: string;
  @IsNumber({}, { message: 'discount must be a number' })
  discount: number;
}
