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
import { ChatModule } from '../../modules/chat/chat.module';
import { UserAuthController } from '../../modules/user/controllers/user.auth.controller';
import { GalleryModule } from '../../modules/gallery/gallery.module';
import { GalleryController } from '../../modules/gallery/controllers/gallery.controller';
import { GalleryService } from '../../modules/gallery/services/gallery.service';

@Module({
  imports: [
    UserModule,
    FamilyTreeModule,
    NotificationModule,
    ChatModule,
    GalleryModule,
  ],
  controllers: [
    AuthController,
    FamilyTreeAuthController,
    NotificationController,
    UserAuthController,
    GalleryController,
  ],
  providers: [UserService, AuthService, NotificationService, GalleryService],
})
export class RouteAuthModule {}
