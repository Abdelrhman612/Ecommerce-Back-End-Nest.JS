import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import {
  ChangePasswordDto,
  ResetPasswordto,
  SignIndto,
  SignUpdto,
  VerifyCodeDto,
} from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
    private readonly mailService: MailerService,
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
  async ResetPassword(resetPasswordto: ResetPasswordto) {
    const { email } = resetPasswordto;
    const user = await this.UserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    await this.UserModel.findOneAndUpdate(
      { email: email },
      { verificationCode: code },
    );

    const htmlMessage = `
  <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Hello ${user.name},</h2>
    <p>You requested to reset your password for <strong>E-Commerce</strong>.</p>
    <p>Your reset code is:</p>
    <h3> ${code}</h3>
    <p>If you didn't request this, just ignore this email.</p>
    <p>— E-Commerce Team</p>
  </body>
</html>

`;
    await this.mailService.sendMail({
      from: process.env.EMAIL_FROM as string,
      to: email,
      subject: ` E-Commerce -> resetPassword`,
      html: htmlMessage,
    });
    return {
      status: 'success',
      message: `Code sent successfully on your email -> ${email}`,
    };
  }
  async verifycode(verifyCodeDto: VerifyCodeDto) {
    const { email, code } = verifyCodeDto;
    const user = await this.UserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    await this.UserModel.findOneAndUpdate(
      { email: email },
      { verificationCode: code },
    );
    console.log('data ->', user.verificationCode, code);
    if (user.verificationCode !== code) {
      throw new UnauthorizedException();
    }
    return {
      status: 'success',
      message: 'Code verified is succussfully , go to change your password',
    };
  }
  async changePassword(newPassword: ChangePasswordDto) {
    const { password, email } = newPassword;
    const user = await this.UserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    const hash = await bcrypt.hash(password, 10);
    await this.UserModel.findOneAndUpdate({ email: email }, { password: hash });

    return { status: 'success', message: 'Change password is successfully' };
  }
}
