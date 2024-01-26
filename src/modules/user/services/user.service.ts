import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(info: CreateUserDto) {
    const password = await this.authService.createPassword(info.password || '');
    return this.userRepository.save({
      ...info,
      created: new Date(),
      password: password.passwordHash,
      salt: password.salt,
    });
  }

  async findAll(find: {}, options = {}): Promise<UserEntity[]> {
    const users = await this.userRepository.find({ where: find });
    return users.filter((user) => {
      const { password, salt, ...filtered } = user;
      return filtered;
    });
  }

  async getTotal(find: {}): Promise<number> {
    return this.userRepository.count({ where: find });
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    const { password, salt, ...filtered } = user;
    return filtered;
  }

  async update(id: number, info: UpdateUserDto) {
    const user: { salt: string } & UpdateUserDto = { salt: '', ...info };
    if (info.password) {
      const password = await this.authService.createPassword(info.password);
      user.password = password.passwordHash;
      user.salt = password.salt;
    }
    await this.userRepository.update({ id }, user);
  }

  async remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
