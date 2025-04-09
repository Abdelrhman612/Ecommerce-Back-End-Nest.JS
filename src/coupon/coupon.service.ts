import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './schemas/coupon.schema';
import { Model } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private CouponModel: Model<Coupon>) {}
  async createCoupon(createCouponDto: CreateCouponDto) {
    const { name } = createCouponDto;

    const coupon = await this.CouponModel.findOne({ name: name }).select(
      '-__v',
    );
    if (coupon) {
      throw new HttpException('Coupon Already exsit', 400);
    }
    const AddCoupon = await this.CouponModel.create(createCouponDto);
    return { status: 'success', data: AddCoupon };
  }

  async findAll() {
    const Coupons = await this.CouponModel.find().select('-__v');
    return { status: 'success', length: Coupons.length, data: Coupons };
  }

  async findOne(_id: string) {
    const Coupon = await this.CouponModel.findById({ _id }).select('-__v');
    if (!Coupon) {
      throw new NotFoundException('Coupon is not found');
    }
    return { status: 'success', data: Coupon };
  }

  async updateCoupon(_id: string, updateCouponDto: UpdateCouponDto) {
    const Coupon = await this.CouponModel.findById({ _id }).select('-__v');
    if (!Coupon) {
      throw new NotFoundException('Coupon is not found');
    }
    const NewCoupon = await this.CouponModel.findByIdAndUpdate(
      _id,
      updateCouponDto,
    ).select('-__v');
    return { status: 'success', data: NewCoupon };
  }

  async remove(_id: string) {
    const Coupon = await this.CouponModel.findById({ _id }).select('-__v');
    if (!Coupon) {
      throw new NotFoundException('Coupon is not found');
    }
    await this.CouponModel.deleteOne({ _id }).select('-__v');
    return { status: 'success', message: 'delete coupon is successfully' };
  }
}
