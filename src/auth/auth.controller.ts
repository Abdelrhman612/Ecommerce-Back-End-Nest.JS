import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpdto,
  SignIndto,
  ResetPasswordto,
  ChangePasswordDto,
  VerifyCodeDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signUpdto: SignUpdto,
  ) {
    return this.authService.signUp(signUpdto);
  }
  @Post('sign-in')
  signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signIndto: SignIndto,
  ) {
    return this.authService.signIn(signIndto);
  }
  @Post('reset-password')
  resetPassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    resetPasswordto: ResetPasswordto,
  ) {
    return this.authService.ResetPassword(resetPasswordto);
  }
  @Post('verify-code')
  async verifyCode(@Body() verifycodeDto: VerifyCodeDto) {
    return this.authService.verifycode(verifycodeDto);
  }
  @Post('change-password')
  changePassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    newPassword: ChangePasswordDto,
  ) {
    return this.authService.changePassword(newPassword);
  }
}
