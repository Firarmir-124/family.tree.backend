import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationEntity,
} from '../entity/notification.entity';
import { UserDevices, UserDevicesEntity } from '../entity/user-devices.entity';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { SendNotificationGroupDto } from '../dtos/send-notification-group.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationEntity.name)
    private readonly notificationModel: Model<Notification>,
    @InjectModel(UserDevicesEntity.name)
    private readonly userDevicesModel: Model<UserDevices>,
  ) {}

  async getNotificationHistory(pagination: PaginationDto) {
    return this.notificationModel
      .find({})
      .sort({ created: -1 })
      .skip((pagination.page - 1) * pagination.perPage)
      .limit(pagination.perPage);
  }

  async findAll() {
    const allDevices = await this.userDevicesModel.find().exec();

    return allDevices.map((item) => ({ token: item.token }));
  }

  async saveHistoryToAllUsers(title: string, message: string) {
    await this.notificationModel.create({
      users: [],
      title: title,
      message: message,
    });
  }

  async save() {
    return this.notificationModel.create({
      users: [],
      title: 'title',
      message: 'mess',
    });
  }

  async saveHistoryToUserGroup(req: SendNotificationGroupDto) {
    await this.notificationModel.create({
      users: req.users,
      title: req.title,
      message: req.message,
    });
  }

  async findUsers(id: string[]) {
    return this.userDevicesModel.find({ user: id }).limit(2);
  }
}
