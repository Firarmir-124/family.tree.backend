import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Удалить одного пользователя',
      description: 'Роут для удаление одного пользователя',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: String }),
  );
