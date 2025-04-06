import { IsString, IsUrl } from 'class-validator';
export class CreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsString({ message: 'image Must be a string' })
  @IsUrl({}, { message: 'image Must be a valid url' })
  image: string;
}
