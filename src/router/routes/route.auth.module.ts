import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { UserService } from '../../modules/user/services/user.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import { FamilyTreeModule } from '../../modules/familyTree/familyTree.module';
import { FamilyTreeAuthController } from '../../modules/familyTree/controllers/familyTree.auth.controller';

@Module({
  imports: [UserModule, FamilyTreeModule],
  controllers: [AuthController, FamilyTreeAuthController],
  providers: [UserService, AuthService],
})
export class RouteAuthModule {}
