import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationEntity } from './entity/notification.entity';
import { UserDevicesEntity } from './entity/user-devices.entity';

@Module({
  imports: [MongooseModule.forFeature([NotificationEntity, UserDevicesEntity])],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository, MongooseModule],
})
export class NotificationModule {}
