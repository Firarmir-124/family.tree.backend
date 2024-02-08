import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';

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

  async create(info: CreateUserDto): Promise<UserEntity> {
    const password = await this.authService.createPassword(info.password || '');
    return this.userRepository.save({
      ...info,
      created: new Date(),
      password: password.passwordHash,
      salt: password.salt,
    });
  }

  async findAll(pagination: PaginationDto): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      where: {},
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
    });

    return users.filter((user) => {
      delete user.password;
      delete user.salt;
      return user;
    });
  }

  async getTotal(): Promise<number> {
    return this.userRepository.count({ where: {} });
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException();
    }

    delete user.salt;
    delete user.password;

    return user;
  }

  async update(id: number, info: UpdateUserDto): Promise<UserEntity> {
    const userOne = await this.userRepository.findOne({ where: { id } });

    if (!userOne) {
      throw new BadRequestException();
    }

    const user: { salt: string } & UpdateUserDto = { salt: '', ...info };

    if (info.password) {
      const password = await this.authService.createPassword(info.password);
      user.password = password.passwordHash;
      user.salt = password.salt;
    }

    const updated = await this.userRepository
      .createQueryBuilder()
      .update(user)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const updatedRaw: UserEntity = updated.raw[0];

    delete updatedRaw.salt;
    delete updatedRaw.password;

    return updatedRaw;
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }
}
