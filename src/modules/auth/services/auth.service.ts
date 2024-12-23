import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { HelperHashService } from '../../../helpers/services/helper.hash.service';
import { HelperDateService } from '../../../helpers/services/helper.date.service';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  private readonly passwordSaltLength: number;
  constructor(
    private readonly usersRepository: AuthRepository,
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltLength =
      +this.configService.get<number>('PASSWORD_SALT') || 10;
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneUser('email', email);
    if (user) {
      const password = this.helperHashService.bcrypt(pass, user.salt);
      if (user.password === password) {
        return user;
      }
    }

    return null;
  }

  public async saveDeviceToken(token: string, id: string) {
    return this.usersRepository.saveDeviceToken(token, id);
  }

  public async validateUserById(id: string): Promise<any> {
    const user = await this.usersRepository.findOneUser('_id', id);

    if (user) {
      return user;
    }
    return null;
  }

  public generateToken(user: any): string {
    console.log('payload', user);
    const payload = JSON.parse(JSON.stringify(user));
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }

  public async createSalt(length: number): Promise<string> {
    return this.helperHashService.randomSalt(length);
  }

  public async createPassword(password: string) {
    const salt: string = await this.createSalt(this.passwordSaltLength);

    const passwordCreated: Date = this.helperDateService.create();
    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      passwordHash,
      passwordCreated,
      salt,
    };
  }
}
