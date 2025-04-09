import { Module } from '@nestjs/common';
import { SubCatergoryService } from './sub-catergory.service';
import { SubCatergoryController } from './sub-catergory.controller';
import { subCategory, subCategorySchema } from './schemas/sub-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: subCategory.name, schema: subCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [SubCatergoryController],
  providers: [SubCatergoryService],
})
export class SubCatergoryModule {}
