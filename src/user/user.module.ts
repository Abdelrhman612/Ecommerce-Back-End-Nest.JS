import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, ProfileController } from './user.controller';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, ProfileController],
  providers: [UserService],
})
export class UserModule {}
