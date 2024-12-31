import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationEntity } from './entity/notification.entity';
import { UserDevicesEntity } from './entity/user-devices.entity';
import { FamilyTreeEntity } from '../familyTree/entities/familyTree.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { FamilyTreeRepository } from '../familyTree/repository/familyTree.repository';
import { UserEntity } from '../user/entities/user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      NotificationEntity,
      UserDevicesEntity,
      FamilyTreeEntity,
      UserEntity,
    ]),
    ScheduleModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    NotificationService,
    NotificationRepository,
    FamilyTreeRepository,
  ],
  exports: [NotificationService, NotificationRepository, MongooseModule],
})
export class NotificationModule {}
