import * as nestjs from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './Guard/Auth.Guard';
import { Roles } from './decorator/user.decorator';

@nestjs.Controller('v1/user')
@nestjs.UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user (Admin only)
   * @param createUserDto User data to create
   * @returns The created user
   */
  @nestjs.Post()
  @Roles(['Admin'])
  async create(
    @nestjs.Body(
      new nestjs.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Get all users (Admin and Manager only)
   * @returns Array of all users
   */
  @nestjs.Get()
  @Roles(['Admin', 'Manager'])
  async findAll(@nestjs.Query() query) {
    return this.userService.findAll(query);
  }

  /**
   * Get a specific user by ID (Admin and Manager only)
   * @param id User ID
   * @returns The requested user
   */
  @nestjs.Get(':id')
  @Roles(['Admin', 'Manager'])
  async findOne(@nestjs.Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Update a user (Admin only)
   * @param id User ID to update
   * @param updateUserDto Data to update
   * @returns The updated user
   */
  @nestjs.Patch(':id')
  @Roles(['Admin'])
  async update(
    @nestjs.Param('id') id: string,
    @nestjs.Body(
      new nestjs.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user (Admin only)
   * @param id User ID to delete
   * @returns Success message
   */
  @nestjs.Delete(':id')
  @Roles(['Admin'])
  async remove(@nestjs.Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
