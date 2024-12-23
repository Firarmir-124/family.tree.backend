import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [MongooseModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [UserService, MongooseModule, UserRepository],
})
export class UserModule {}
