import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export const ApiFindAllUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiQuery({ name: 'page', type: Number, required: false }),
    ApiQuery({ name: 'perPage', type: Number, required: false }),
    ApiQuery({ name: 'sort', type: String, required: false }),
    ApiQuery({ name: 'sortDir', type: String, required: false }),
    ApiOperation({
      summary: 'Получить всех пользователей',
      description: 'Роут для получение всех пользователей',
    }),
    ApiResponse({
      type: [User],
    }),
  );
