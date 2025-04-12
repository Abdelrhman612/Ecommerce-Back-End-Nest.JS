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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';
import { Roles } from 'src/user/decorator/user.decorator';

@Controller('v1/product') // Base route for all product endpoints
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Create new product (Admin only)
   * @param createProductDto Validated product data using ValidationPipe
   * @returns Created product
   */
  @Post()
  @UseGuards(AuthGuard) // Requires authentication
  @Roles(['admin']) // Restrict to admin role
  create(
    @Body(
      new ValidationPipe({
        whitelist: true, // Remove non-whitelisted properties
        forbidNonWhitelisted: true, // Throw error for non-whitelisted properties
      }),
    )
    createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(createProductDto);
  }

  /**
   * Get all products with optional filtering
   * @param query Filter criteria (e.g., ?query={"price":{"$gt":100}})
   * @returns Filtered list of products
   */
  @Get()
  findAll(@Query() query: { query: any }) {
    return this.productService.findAll(query);
  }

  /**
   * Get single product by ID
   * @param _id Product ID
   * @returns Product details
   */
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.productService.findOne(_id);
  }

  /**
   * Update product (Admin only)
   * @param _id Product ID to update
   * @param updateProductDto Partial product data
   * @returns Updated product
   */
  @Patch(':id')
  @UseGuards(AuthGuard) // Requires authentication
  @Roles(['admin']) // Restrict to admin role
  update(@Param('id') _id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(_id, updateProductDto);
  }

  /**
   * Delete product (Admin only)
   * @param _id Product ID to delete
   * @returns Deletion confirmation
   */
  @Delete(':id')
  @UseGuards(AuthGuard) // Requires authentication
  @Roles(['admin']) // Restrict to admin role
  remove(@Param('id') _id: string) {
    return this.productService.remove(_id);
  }
}
