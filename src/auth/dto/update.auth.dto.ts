import { PartialType } from '@nestjs/mapped-types';
import { SignUpdto } from './auth.dto';

export class UpdateUserDto extends PartialType(SignUpdto) {}
