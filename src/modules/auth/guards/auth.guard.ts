import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { WsException } from '@nestjs/websockets';
import { User } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getClient();

    const tokenPostman =
      request.handshake.headers['authorization']?.split(' ')[1];
    const tokenUser = request.handshake.auth['authorization'];

    // const authorization = request.handshake.headers['authorization'];

    const error = new WsException({
      codeStatus: HttpStatus.UNAUTHORIZED,
      message: 'пользователь не автоизован',
    });

    // if (!authorization) {
    //   throw error;
    // }

    const user: User = await this.jwtService.verifyAsync(
      !tokenPostman ? tokenUser : tokenPostman,
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    if (!user) {
      throw error;
    }

    request.user = user;

    return true;
  }
}
