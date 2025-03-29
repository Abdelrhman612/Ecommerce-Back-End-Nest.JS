import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  findAll() {
    return this.UserModel.find();
  }

  findOne(id: number) {
    return this.UserModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne(updateUserDto);
  }

  remove(id: number) {
    return this.UserModel.deleteOne({ id });
  }
}
