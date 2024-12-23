import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { UserService } from '../../modules/user/services/user.service';
import { AuthService } from '../../modules/auth/services/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class RouteAuthModule {}
