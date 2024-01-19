import { Module } from '@nestjs/common';
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./entities/user.entity";
import { AuthService } from "../auth/services/auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
