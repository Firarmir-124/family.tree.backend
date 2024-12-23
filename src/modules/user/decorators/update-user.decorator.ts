import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export const ApiUpdateUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Редактировать одного пользователя',
      description: 'Роут для редактирование одного пользователя',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: User }),
    ApiBody({ type: CreateUserDto }),
  );
