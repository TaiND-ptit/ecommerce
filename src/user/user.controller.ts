import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schema/user.schema';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
// import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private configService: ConfigService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  create(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
