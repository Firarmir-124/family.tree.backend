import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendNotificationGroupDto } from '../dtos/send-notification-group.dto';

export const ApiSendNotificationToUsersGroup = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Отправка уведомлений нескольким пользователям',
      description: 'Роут для отправки уведомлений нескольким пользователям',
    }),
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiBody({
      type: SendNotificationGroupDto,
    }),
  );
