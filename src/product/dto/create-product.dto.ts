import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsMongoId,
  IsArray,
  MinLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'The title field is required.' })
  @MinLength(3, { message: 'Title must be at least 3 characters.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The description field is required.' })
  @MinLength(20, { message: 'Description must be at least 20 characters.' })
  description: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsNotEmpty({ message: 'The imageCover field is required.' })
  imageCover: string;

  @IsArray()
  @IsOptional()
  image?: string[];

  @IsNumber()
  @IsOptional()
  sold?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The price field is required.' })
  @Min(1, { message: 'Price must be at least 1 L.E' })
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'PriceAfterDescount must be at least 1 L.E' })
  priceAfterdescount?: number;

  @IsArray()
  @IsOptional()
  colors?: string[];

  @IsMongoId()
  @IsNotEmpty({ message: 'The category field is required.' })
  category: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'The subCategory field is required.' })
  subCategory: string;

  @IsMongoId()
  @IsOptional()
  brand?: string;
}
