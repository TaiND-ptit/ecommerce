import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userModel.findOne({
      email: registerUserDto.email,
    });
    const isMobile = await this.userModel.findOne({
      mobile: registerUserDto.mobile,
    });
    if (user) {
      throw new HttpException('User has existed', HttpStatus.BAD_REQUEST);
    } else if (isMobile) {
      throw new HttpException('Mobile has existed', HttpStatus.BAD_REQUEST);
    } else {
      return await this.userModel.create(registerUserDto);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });
    console.log(user);
    console.log(user?.password);
    console.log(loginUserDto?.password);
    const checkPass = await bcrypt.compareSync(
      loginUserDto?.password,
      user?.password,
    );
    if (user && checkPass) {
      const { password, role, ...userData } = user.toObject();
      return {
        userData,
      };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    console.log(user);
    // if (!user) {
    //   throw new HttpException('Email is not exist', HttpStatus.BAD_REQUEST);
    // }
    // const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    // if (!checkPass) {
    //   throw new HttpException('Pass is not correct', HttpStatus.BAD_REQUEST);
    // }

    // Tạo access token và refresh token
    // const payload = { id: user.id, email: user.email };
    // return this.generateToken(payload);
  }
}
