import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export const ApiFindOneUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить одного пользователя',
      description: 'Роут для получение одного пользователя',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: User }),
  );
