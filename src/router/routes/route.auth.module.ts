import { Module } from '@nestjs/common';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../../modules/user/services/user.service';
import { UserModule } from '../../modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class RouteAuthModule {}
