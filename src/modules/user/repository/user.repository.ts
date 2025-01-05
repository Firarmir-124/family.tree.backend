import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserEntity } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../types';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userRepository: Model<User>,
  ) {}

  public async createUser(
    info: CreateUserDto,
    pass: string,
    salt: string,
  ): Promise<User> {
    try {
      return this.userRepository.create({
        ...info,
        created: new Date(),
        password: pass,
        salt: salt,
      });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneUser(_id: string): Promise<IUser> {
    try {
      return this.userRepository.findOne({ _id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateUser(_id: string, info: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.updateOne({ _id }, { $set: info });

      return this.userRepository.findOne({ _id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeUser(_id: string): Promise<string> {
    try {
      await this.userRepository.deleteOne({ _id });
      return _id;
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
