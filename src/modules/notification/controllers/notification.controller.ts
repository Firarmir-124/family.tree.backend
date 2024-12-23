import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { SendNotificationGroupDto } from '../dtos/send-notification-group.dto';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { ApiGetAllNotification } from '../decorators/get-all-notifications.decorator';
import { SendNotificationForAllUsersDto } from '../dtos/send-notification-all.dto';
import { ApiSendNotificationToAllUsers } from '../decorators/send-notifications-all.decorator';
import { ApiSendNotificationToUsersGroup } from '../decorators/send-notification-one.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../global/guards/role.guard';
import { Roles } from '../../../global/decorators/role.decorator';

@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notification',
  version: '1',
})
@ApiTags('notifications')
@ApiBearerAuth('access-token')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @ApiGetAllNotification()
  @Get('history')
  async getAllNotifications(@Pagination() pagination: PaginationDto) {
    return await this.service.getAllNotifications(pagination);
  }

  @Roles('admin' && 'super')
  @Post('save')
  async save() {
    return this.service.save();
  }

  @Roles('admin' && 'super')
  @ApiSendNotificationToAllUsers()
  @Post('send')
  async sendNotificationsToAllUsers(
    @Body() req: SendNotificationForAllUsersDto,
  ) {
    return this.service.sendNotificationsToAllUsers(req);
  }

  @Roles('admin' && 'super')
  @ApiSendNotificationToUsersGroup()
  @Post('group')
  async sendNotificationsToOneUser(@Body() req: SendNotificationGroupDto) {
    return this.service.sendNotificationToUserGroup(req);
  }
}
