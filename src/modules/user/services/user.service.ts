import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  public async findOne(id: string): Promise<User> {
    const checkId = mongoose.Types.ObjectId.isValid(id);

    if (!checkId) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.findOneUser(id);

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  public async update(id: string, info: UpdateUserDto): Promise<User> {
    const checkId = mongoose.Types.ObjectId.isValid(id);

    if (!checkId) {
      throw new BadRequestException();
    }

    const userOne = await this.userRepository.findOneUser(id);

    if (!userOne) {
      throw new BadRequestException();
    }

    console.log('userOne', userOne);

    const user: { salt: string } & UpdateUserDto = {
      ...info,
      salt: userOne.salt,
      password: userOne.password,
    };

    console.log('info', info.password);

    if (info.password && info.newPassword) {
      console.log(info.password);
      const checkPassword = await this.authService.isPasswordValid(
        info.password,
        userOne.password,
        user.salt,
      );

      if (!checkPassword) {
        throw new BadRequestException(`Не верный пароль`);
      }

      const password = await this.authService.createPassword(info.newPassword);
      user.password = password.passwordHash;
      user.salt = password.salt;
    }

    return this.userRepository.updateUser(id, user);
  }

  public async remove(id: string): Promise<string> {
    return this.userRepository.removeUser(id);
  }
}
