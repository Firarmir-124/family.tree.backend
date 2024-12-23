import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserEntity } from '../../user/entities/user.entity';
import {
  UserDevices,
  UserDevicesEntity,
} from '../../notification/entity/user-devices.entity';

export class AuthRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userRepository: Model<User>,
    @InjectModel(UserDevicesEntity.name)
    private readonly userDeviceRepository: Model<UserDevices>,
  ) {}

  public async findAll() {
    return this.userRepository.find();
  }

  public async findOneUser(filed: string, meaning: string): Promise<User> {
    try {
      return this.userRepository.findOne({ [filed]: meaning });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async saveDeviceToken(token: string, id: string) {
    const deviceToken = await this.userDeviceRepository.findOne({
      token: token,
    });

    if (!deviceToken) {
      await this.userDeviceRepository.create({
        user: id,
        token: token,
      });
    }

    await this.userDeviceRepository.findOneAndUpdate(
      { token: token },
      { user: id },
    );
  }
}
