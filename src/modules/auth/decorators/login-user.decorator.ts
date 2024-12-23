import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenEntity } from '../entities/token.entity';
import { LoginUserDto } from '../dto/login-user.dto';

export const ApiLoginUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Логин пользователя',
      description: 'Роут для логина пользователя',
    }),
    ApiResponse({
      type: TokenEntity,
    }),
    ApiBody({
      type: LoginUserDto,
    }),
  );
