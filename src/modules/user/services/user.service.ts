import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDoc, UserEntity } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userModel.findOne({ username });
  }

  async create(info: CreateUserDto) {
    const password = await this.authService.createPassword(info.password || '');
    return this.userModel.create({
      ...info,
      createdAt: new Date(),
      password: password.passwordHash,
      salt: password.salt,
    });
  }

  async findAll(find: {}, options = {}): Promise<UserEntity[]> {
    const users = await this.userModel.find(find, null, options);
    return users.filter((user) => {
      const { password, salt, ...filtered } = user;
      return filtered;
    });
  }

  async getEmployees(): Promise<UserEntity[]> {
    const users = await this.userModel.find({ blocked: false });
    return users.filter((user) => {
      const { password, ...filtered } = user;
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        category: user.category,
        description: user.description,
        position: user.position,
        email: user.email,
        mobileNumber: user.mobileNumber,
        photo: user.photo,
      };
    });
  }
  async getTotal(find: {}): Promise<number> {
    return this.userModel.count(find);
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: id });
    const { password, salt, ...filtered } = user.toJSON();
    return filtered;
  }

  async update(id: string, info: UpdateUserDto) {
    const user: any = { ...info };
    if (info.hasOwnProperty('password') && !info.password) {
      delete user.password;
    }
    if (info.hasOwnProperty('_id')) {
      delete user._id;
    }
    if (info.password) {
      const password = await this.authService.createPassword(info.password);
      user.password = password.passwordHash;
      user.salt = password.salt;
    }
    console.log('user', user);
    return this.userModel.updateOne({ _id: id }, user);
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
