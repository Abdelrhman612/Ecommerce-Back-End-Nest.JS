import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';
import { Roles } from 'src/user/decorator/user.decorator';

@Controller('v1/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  /**
   * Create a new brand
   * Only accessible by users with 'Admin' role
   * Uses ValidationPipe to sanitize and validate incoming data
   * @param createBrandDto - DTO containing brand data
   */
  @Post()
  @UseGuards(AuthGuard)
  @Roles(['Admin'])
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createBrandDto: CreateBrandDto,
  ) {
    return this.brandService.createBrand(createBrandDto);
  }

  /**
   * Get all brands
   * Publicly accessible
   */
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  /**
   * Get a specific brand by ID
   * @param _id - ID of the brand to retrieve
   */
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.brandService.findOne(_id);
  }

  /**
   * Update an existing brand
   * Only accessible by users with 'Admin' role
   * @param _id - ID of the brand to update
   * @param updateBrandDto - DTO containing updated brand data
   */
  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(['Admin'])
  update(@Param('id') _id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.updateBrand(_id, updateBrandDto);
  }

  /**
   * Delete a brand by ID
   * Only accessible by users with 'Admin' role
   * @param _id - ID of the brand to delete
   */
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['Admin'])
  remove(@Param('id') _id: string) {
    return this.brandService.remove(_id);
  }
}
