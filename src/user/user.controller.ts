/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
   *
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

@nestjs.Controller('profile')
@nestjs.UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly userService: UserService) {}
  /**
   * Any user can get your data
   * @returns Success message and Get all users
   * Get a user (Admin and User only)
   */
  @nestjs.Get('me')
  @Roles(['Admin', 'User'])
  async GetMe(@nestjs.Req() req: { user: any }) {
    return this.userService.GetMe(req.user);
  }
  /**
   * Any user can Update your data
   * @returns Success message and Update Your data
   * Update a user (Admin and User only)
   */
  @nestjs.Patch('UpdateMe')
  @Roles(['Admin', 'User'])
  async updateMe(
    @nestjs.Body() updateUserDto: UpdateUserDto,
    @nestjs.Req() req: { user: any },
  ) {
    return this.userService.updateMe(req.user, updateUserDto);
  }
  /**
   * Any user can Delete your data
   * @returns Success message and Delete Your data
   * Delete a user (Admin and User only)
   */
  @nestjs.Delete('DeleteMe')
  @Roles(['Admin', 'User'])
  async deleteMe(@nestjs.Req() req: { user: any }) {
    return this.userService.DeleteMe(req.user);
  }
}
