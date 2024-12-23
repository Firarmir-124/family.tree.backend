import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
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

  public async create(info: CreateUserDto): Promise<User> {
    const password = await this.authService.createPassword(info.password || '');
    const { passwordHash, salt } = password;

    return this.userRepository.createUser(info, passwordHash, salt);
  }

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

    const user: { salt: string } & UpdateUserDto = {
      salt: userOne.salt,
      ...info,
    };

    if (info.password) {
      const password = await this.authService.createPassword(info.password);
      user.password = password.passwordHash;
      user.salt = password.salt;
    }

    return this.userRepository.updateUser(id, user);
  }

  public async remove(id: string): Promise<string> {
    return this.userRepository.removeUser(id);
  }
}
