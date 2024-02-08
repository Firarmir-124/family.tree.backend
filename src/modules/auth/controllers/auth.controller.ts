import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../entities/token.entity';

@Controller({
  version: '1',
  path: '',
})
@ApiTags('public.auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiBody({ schema: { example: { username: 'admin', password: 'admin' } } })
  @ApiResponse({
    type: TokenEntity,
    status: HttpStatus.CREATED,
    description: 'положительный ответ',
  })
  async login(@Body('username') username, @Body('password') password) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user._id, user.username);

    return { token };
  }
}
