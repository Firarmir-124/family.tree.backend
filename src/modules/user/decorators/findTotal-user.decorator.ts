import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiFindTotalUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить тотал пользователя',
      description: 'Роут для получение тотола пользователей',
    }),
    ApiResponse({ type: Number }),
  );
