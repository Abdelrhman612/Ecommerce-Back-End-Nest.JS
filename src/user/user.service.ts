/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Creates a new user with hashed password
   * @param createUserDto User data to create
   * @returns The created user without sensitive information
   * @throws HttpException if user already exists
   */
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ status: string; data: { AddUser: User } }> {
    const { name, email, password, gender } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      gender,
    };

    // Create and return the new user
    const createdUser = await this.userModel.create(newUser);
    return { status: 'success', data: { AddUser: createdUser } };
  }

  /**
   * Retrieves all users from the database
   * @returns Array of all users without sensitive information
   */
  async findAll(query): Promise<{
    status: string;
    message: string;
    length: number;
    data: User[];
  }> {
    const {
      limit = 1000_000_000,
      skip = 0,
      sort = 'asc',
      name,
      email,
      role,
    } = query;

    if (Number.isNaN(Number(+limit))) {
      throw new HttpException('Invalid limit', 400);
    }
    if (Number.isNaN(Number(+skip))) {
      throw new HttpException('Invalid skip', 400);
    }
    if (!['asc', 'desc'].includes(sort)) {
      throw new HttpException('Invalid sort', 400);
    }
    const users = await this.userModel
      .find()
      .select('-password -__v')
      .lean()
      .skip(skip)
      .limit(limit)
      .where('name', new RegExp(name, 'i'))
      .where('email', new RegExp(email, 'i'))
      .where('role', new RegExp(role, 'i'))
      .sort({ name: sort })
      .exec();
    return {
      status: 'success',
      message: 'Users found successfully',
      length: users.length,
      data: users,
    };
  }

  /**
   * Finds a single user by ID
   * @param id User ID to search for
   * @returns The found user without sensitive information
   * @throws NotFoundException if user doesn't exist
   */
  async findOne(id: string): Promise<{ status: string; data: User }> {
    const user = await this.userModel
      .findById(id)
      .select('-password -__v')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { status: 'success', data: user };
  }

  /**
   * Updates a user's information
   * @param id User ID to update
   * @param updateUserDto Data to update
   * @returns The updated user without sensitive information
   * @throws NotFoundException if user doesn't exist
   */
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: string; data: any }> {
    // Check if user exists first
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Update and return the user
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password -__v')
      .lean()
      .exec();

    return { status: 'success', data: updatedUser };
  }

  /**
   * Deletes a user from the database
   * @param id User ID to delete
   * @returns Success message
   * @throws NotFoundException if user doesn't exist
   */
  async deleteUser(id: string): Promise<{ status: string; message: string }> {
    // Check if user exists first
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.findByIdAndDelete(id).exec();
    return { status: 'success', message: 'User deleted successfully' };
  }
}
