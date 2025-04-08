import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubCatergoryService } from './sub-catergory.service';
import { CreateSubCatergoryDto } from './dto/create-sub-catergory.dto';
import { UpdateSubCatergoryDto } from './dto/update-sub-catergory.dto';
import { Roles } from 'src/user/decorator/user.decorator';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';

@Controller('v1/sub-category')
export class SubCatergoryController {
  constructor(private readonly subCatergoryService: SubCatergoryService) {}

  /**
   * Create a new sub-category
   * Only accessible by users with 'Admin' role
   * @param createSubCatergoryDto - DTO containing sub-category data
   */
  @Post()
  @Roles(['Admin'])
  @UseGuards(AuthGuard)
  create(@Body() createSubCatergoryDto: CreateSubCatergoryDto) {
    return this.subCatergoryService.CreateSubCategory(createSubCatergoryDto);
  }

  /**
   * Get all sub-categories
   * Publicly accessible
   */
  @Get()
  findAll() {
    return this.subCatergoryService.findAll();
  }

  /**
   * Get a specific sub-category by ID
   * @param _id - ID of the sub-category
   */
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.subCatergoryService.findOne(_id);
  }

  /**
   * Update an existing sub-category
   * Only accessible by users with 'Admin' role
   * @param _id - ID of the sub-category to update
   * @param updateSubCatergoryDto - DTO containing updated data
   */
  @Patch(':id')
  @Roles(['Admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') _id: string,
    @Body() updateSubCatergoryDto: UpdateSubCatergoryDto,
  ) {
    return this.subCatergoryService.updateSubCategory(
      _id,
      updateSubCatergoryDto,
    );
  }

  /**
   * Delete a sub-category by ID
   * Only accessible by users with 'Admin' role
   * @param _id - ID of the sub-category to delete
   */
  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') _id: string) {
    return this.subCatergoryService.remove(_id);
  }
}
