import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';
import { Roles } from 'src/user/decorator/user.decorator';

@Controller('v1/coupon')
@UseGuards(AuthGuard) // Apply authentication guard to all routes in this controller
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  /**
   * Create a new coupon
   * Only accessible by users with 'admin' role
   * Uses ValidationPipe to validate and sanitize the request body
   * @param createCouponDto - DTO containing coupon details
   */
  @Post()
  @Roles(['admin'])
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createCouponDto: CreateCouponDto,
  ) {
    return this.couponService.createCoupon(createCouponDto);
  }

  /**
   * Retrieve all coupons
   * Only accessible by users with 'admin' role
   */
  @Get()
  @Roles(['admin'])
  findAll() {
    return this.couponService.findAll();
  }

  /**
   * Retrieve a specific coupon by its ID
   * Only accessible by users with 'admin' role
   * @param _id - ID of the coupon to retrieve
   */
  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') _id: string) {
    return this.couponService.findOne(_id);
  }

  /**
   * Update an existing coupon
   * Only accessible by users with 'admin' role
   * @param _id - ID of the coupon to update
   * @param updateCouponDto - DTO containing updated coupon details
   */
  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') _id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.updateCoupon(_id, updateCouponDto);
  }

  /**
   * Delete a coupon by its ID
   * Only accessible by users with 'admin' role
   * @param _id - ID of the coupon to delete
   */
  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') _id: string) {
    return this.couponService.remove(_id);
  }
}
