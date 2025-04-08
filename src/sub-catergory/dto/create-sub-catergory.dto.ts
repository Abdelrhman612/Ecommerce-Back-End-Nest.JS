import { IsString } from 'class-validator';

export class CreateSubCatergoryDto {
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsString({ message: 'category Must be a string' })
  category: string;
}
