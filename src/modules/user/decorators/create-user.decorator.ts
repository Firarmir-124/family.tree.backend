import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export const ApiCreateUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Создать пользователя',
      description: 'Роут для создание пользоватееля',
    }),
    ApiResponse({
      type: User,
    }),
    ApiBody({ type: CreateUserDto }),
  );
