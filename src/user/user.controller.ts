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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './Guard/Auth.Guard';
import { Roles } from './decorator/user.decorator';

@Controller('v1/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user (Admin only)
   * @param createUserDto User data to create
   * @returns The created user
   */
  @Post()
  @Roles(['Admin'])
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Get all users (Admin and Manager only)
   * @returns Array of all users
   */
  @Get()
  @Roles(['Admin', 'Manager'])
  async findAll() {
    return this.userService.findAll();
  }

  /**
   * Get a specific user by ID (Admin and Manager only)
   * @param id User ID
   * @returns The requested user
   */
  @Get(':id')
  @Roles(['Admin', 'Manager'])
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Update a user (Admin only)
   * @param id User ID to update
   * @param updateUserDto Data to update
   * @returns The updated user
   */
  @Patch(':id')
  @Roles(['Admin'])
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user (Admin only)
   * @param id User ID to delete
   * @returns Success message
   */
  @Delete(':id')
  @Roles(['Admin'])
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
