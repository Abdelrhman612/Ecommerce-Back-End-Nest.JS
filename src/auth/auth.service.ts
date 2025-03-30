import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { SignIndto, SignUpdto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(
    signUpDto: SignUpdto,
  ): Promise<{ status: string; data: any; token: string }> {
    const { name, email, password, role } = signUpDto;

    const existingUser = await this.UserModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.UserModel.create({
      name,
      email,
      password: hash,
      role: role || 'user',
    });
    const payload = {
      sub: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      status: 'success',
      data: newUser,
      token: token,
    };
  }
  async signIn(signInDto: SignIndto): Promise<{ status: string; data: any }> {
    const { email, password } = signInDto;
    const user = await this.UserModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return { status: 'success', data: { token } };
  }
}
