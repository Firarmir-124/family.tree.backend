import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

export const ApiGetAllUsers = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение всех пользователей',
      description: 'Роут для получение всех пользователей',
    }),
    ApiResponse({
      status: HttpStatus.OK,
    }),
  );
