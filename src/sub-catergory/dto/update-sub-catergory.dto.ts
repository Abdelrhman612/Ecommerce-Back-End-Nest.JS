import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCatergoryDto } from './create-sub-catergory.dto';

export class UpdateSubCatergoryDto extends PartialType(CreateSubCatergoryDto) {}
