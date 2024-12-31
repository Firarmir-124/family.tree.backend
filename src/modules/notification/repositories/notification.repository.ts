import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationEntity,
} from '../entity/notification.entity';
import { UserDevices, UserDevicesEntity } from '../entity/user-devices.entity';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationEntity.name)
    private readonly notificationModel: Model<Notification>,
    @InjectModel(UserDevicesEntity.name)
    private readonly userDevicesModel: Model<UserDevices>,
  ) {}

  async getNotificationHistory(
    pagination: PaginationDto,
    id: string,
  ): Promise<Notification[]> {
    return this.notificationModel
      .find({ user: id })
      .sort({ created: -1 })
      .skip((pagination.page - 1) * pagination.perPage)
      .limit(pagination.perPage);
  }

  async findAll(userId: string): Promise<Array<{ token: string }>> {
    const allDevices = await this.userDevicesModel
      .find({ user: userId })
      .exec();

    return allDevices.map((item) => ({ token: item.token }));
  }

  async remove(id: string): Promise<string> {
    await this.notificationModel.deleteOne({ _id: id });
    return id;
  }

  async save(dto: { message: string; user: string }) {
    return this.notificationModel.create({
      user: dto.user,
      message: dto.message,
    });
  }
}
