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
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';
import { Roles } from 'src/user/decorator/user.decorator';

@Controller('v1/category') // This sets the base route for all endpoints in this controller to /v1/category
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // -------------------------------
  // POST /v1/category
  // Only accessible by Admin users
  // Creates a new category using validated input
  @Post()
  @Roles(['Admin']) // Custom decorator to specify the role(s) allowed to access this route
  @UseGuards(AuthGuard) // Protects the route with authentication and role-based authorization
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCatgory(createCategoryDto);
  }

  // -------------------------------
  // GET /v1/category
  // Public route (no auth required)
  // Fetches all categories, optionally filtered by query (e.g., name)
  @Get()
  async findAll(@Query() query: { name: any }) {
    return this.categoryService.findAll(query);
  }

  // -------------------------------
  // GET /v1/category/:id
  // Public route
  // Fetches a single category by its ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findCategory(id);
  }

  // -------------------------------
  // PATCH /v1/category/:id
  // Only accessible by Admin users
  // Updates an existing category with new data
  @Patch(':id')
  @Roles(['Admin'])
  @UseGuards(AuthGuard)
  async update(
    @Param('id') _id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCatgory(_id, updateCategoryDto);
  }

  // -------------------------------
  // DELETE /v1/category/:id
  // Only accessible by Admin users
  // Deletes a category by its ID
  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') _id: string) {
    return this.categoryService.DeleteCatgory(_id);
  }
}
