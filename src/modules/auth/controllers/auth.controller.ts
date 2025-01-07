import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ApiLoginUser } from '../decorators/login-user.decorator';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserEntity } from '../../user/entities/user.entity';
import { Model } from 'mongoose';

@Controller({
  version: '1',
  path: '',
})
@ApiTags('public.auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @InjectModel(UserEntity.name)
    private readonly userRepository: Model<User>,
  ) {}

  @ApiLoginUser()
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('данные введены не верно');
    }

    if (loginUserDto.token) {
      await this.authService.saveDeviceToken(loginUserDto?.token, user.id);
    }

    const token = this.authService.generateToken(user);

    delete user.password;
    delete user.salt;

    return { token: token, user: user };
  }

  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const userEmail = await this.userRepository.findOne({
      email: registerUserDto.email,
    });

    const userPhone = await this.userRepository.findOne({
      phone: registerUserDto.phone,
    });

    if (userEmail) {
      throw new BadRequestException('email уже существует');
    }

    if (userPhone) {
      throw new BadRequestException('Номер телефона уже используется');
    }

    const password = await this.authService.createPassword(
      registerUserDto.password || '',
    );
    const { passwordHash, salt } = password;

    const user = await this.userRepository.create({
      ...registerUserDto,
      password: passwordHash,
      salt: salt,
      photo: null,
    });

    if (registerUserDto.token) {
      await this.authService.saveDeviceToken(registerUserDto.token, user.id);
    }

    const token = this.authService.generateToken(user);

    delete user.password;
    delete user.salt;

    return { token: token, user: user };
  }
}
