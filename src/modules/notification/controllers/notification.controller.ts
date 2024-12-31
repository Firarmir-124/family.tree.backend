import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Notification } from '../entity/notification.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notification',
  version: '1',
})
@ApiTags('notifications')
@ApiBearerAuth('access-token')
export class NotificationController {
  constructor(
    private readonly service: NotificationService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getAllNotifications(
    @Pagination() pagination: PaginationDto,
    @Req() req: Request,
  ): Promise<Notification[]> {
    const token = req.headers['authorization'].split(' ')[1];
    const { _id } = await this.jwtService.verifyAsync(token, {
      ignoreExpiration: true,
      secret: this.configService.get('JWT_SECRET'),
    });
    return await this.service.getAllNotifications(pagination, _id);
  }

  @Delete(':id')
  async removeNotification(@Param('id') id: string): Promise<string> {
    console.log('123');
    return await this.service.removeNotification(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  public happyBirthday() {
    return this.service.happyBirthday();
  }
}
