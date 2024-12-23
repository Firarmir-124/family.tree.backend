import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendNotificationForAllUsersDto } from '../dtos/send-notification-all.dto';

export const ApiSendNotificationToAllUsers = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Отправка уведомлений всем пользователям',
      description: 'Роут для отправки уведомлений всем пользователям',
    }),
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiBody({
      type: SendNotificationForAllUsersDto,
    }),
  );
