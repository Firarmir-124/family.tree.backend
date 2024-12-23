import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { Error } from 'mongoose';
import { SendNotificationGroupDto } from '../dtos/send-notification-group.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { SendNotificationForAllUsersDto } from '../dtos/send-notification-all.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  private expo = new Expo({
    accessToken: 'o8YGdGZZ2NCV0REW9jFM7LThnncVcvEesmKeAMrH',
  });

  async getAllNotifications(pagination: PaginationDto) {
    return this.repository.getNotificationHistory(pagination);
  }

  async save() {
    return this.repository.save();
  }

  async sendNotificationsToAllUsers(req: SendNotificationForAllUsersDto) {
    const allUserDevices = await this.repository.findAll();

    await this.repository.saveHistoryToAllUsers(req.title, req.message);

    const notification: ExpoPushMessage[] = allUserDevices.map((item) => ({
      to: item.token,
      title: req.title,
      body: req.message,
    }));

    try {
      const ticket = await this.expo.sendPushNotificationsAsync(notification);
      console.log(ticket);
      return ticket;
    } catch (e) {
      console.log('Error sending push notifications:', e);
      throw Error;
    }
  }

  async sendNotificationToUserGroup(req: SendNotificationGroupDto) {
    const users = await this.repository.findUsers(req.users);

    if (users.length === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    const info: ExpoPushMessage[] = users.map((item) => ({
      to: item.token,
      title: req.title,
      body: req.message,
    }));

    await this.repository.saveHistoryToUserGroup(req);

    try {
      const ticket = await this.expo.sendPushNotificationsAsync(info);
      console.log(ticket);
      return ticket;
    } catch (e) {
      console.log(e);
    }
  }
}
