import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetAllNotification = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'История отправленных уведомлений',
      description: 'Роут для получения истории уведомлений',
    }),
    ApiResponse({
      status: HttpStatus.OK,
    }),
  );
