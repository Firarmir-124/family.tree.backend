import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { UserService } from '../../modules/user/services/user.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import { FamilyTreeModule } from '../../modules/familyTree/familyTree.module';
import { FamilyTreeAuthController } from '../../modules/familyTree/controllers/familyTree.auth.controller';
import { NotificationModule } from '../../modules/notification/notification.module';
import { NotificationController } from '../../modules/notification/controllers/notification.controller';
import { NotificationService } from '../../modules/notification/services/notification.service';

@Module({
  imports: [UserModule, FamilyTreeModule, NotificationModule],
  controllers: [
    AuthController,
    FamilyTreeAuthController,
    NotificationController,
  ],
  providers: [UserService, AuthService, NotificationService],
})
export class RouteAuthModule {}
