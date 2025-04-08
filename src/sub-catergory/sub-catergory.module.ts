import { Module } from '@nestjs/common';
import { SubCatergoryService } from './sub-catergory.service';
import { SubCatergoryController } from './sub-catergory.controller';
import { subCategory, subCategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: subCategory.name, schema: subCategorySchema },
    ]),
  ],
  controllers: [SubCatergoryController],
  providers: [SubCatergoryService],
})
export class SubCatergoryModule {}
