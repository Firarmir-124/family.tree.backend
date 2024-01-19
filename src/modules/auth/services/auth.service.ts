import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import { HelperHashService } from "../../../helpers/services/helper.hash.service";
import { HelperDateService } from "../../../helpers/services/helper.date.service";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "../../user/entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class AuthService {

  private readonly passwordSaltLength: number;
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltLength = +this.configService.get<number>('PASSWORD_SALT') || 10;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ isActive: true, username });
    if (user) {
      const password = this.helperHashService.bcrypt(pass, user.salt);
      if (user.password === password) {
        const { password, ...result } = user.toJSON();
        return result;
      }
    }
    return null;
  }

  async validateUserById(id: string): Promise<any> {
    const user = await this.userModel.findOne({ isActive: true, _id: id });
    if (user) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  generateToken(userId: string, username: string): string {
    const payload = { sub: userId, username };
    console.log('payload', payload);
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), { expiresIn: this.configService.get('JWT_EXPIRES_IN') });
  }

  async createSalt(length: number): Promise<string> {
    return this.helperHashService.randomSalt(length);
  }

  async createPassword(password: string) {
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
