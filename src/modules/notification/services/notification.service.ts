import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { FamilyTreeRepository } from '../../familyTree/repository/familyTree.repository';
import { Notification } from '../entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly familyTreeRepository: FamilyTreeRepository,
  ) {}

  private expo = new Expo({
    accessToken: 'dxToV0xL25ArBuB-SmKWHhjUQRNmBXIDZhAqxBrj',
  });

  async getAllNotifications(
    pagination: PaginationDto,
    id: string,
  ): Promise<Notification[]> {
    return this.repository.getNotificationHistory(pagination, id);
  }

  async removeNotification(id: string): Promise<string> {
    return this.repository.remove(id);
  }

  public async happyBirthday() {
    const familyList = await this.familyTreeRepository.findAllFamilyTree({});

    for (const family of familyList) {
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();

      const dateOfBirthMonth = new Date(family.dob).getMonth() + 1;
      const dateOfBirthDay = new Date(family.dob).getDate();

      if (currentMonth === dateOfBirthMonth && currentDay === dateOfBirthDay) {
        console.log('user', family.userCreated);

        await this.repository.save({
          message: `Сегодня у ${family.name} день рождения`,
          user: family.userCreated.toString(),
        });

        const devices = await this.repository.findAll(
          family.userCreated.toString(),
        );

        const notification: ExpoPushMessage[] = devices.map((item) => ({
          to: item.token,
          title: 'Уведомление',
          body: `Сегодня у ${family.name} день рождения`,
        }));

        await this.expo.sendPushNotificationsAsync(notification);
      }
    }
  }
}
