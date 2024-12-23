import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './services/local.strategy';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './services/jwt.strategy';
import { AuthRepository } from './repository/auth.repository';
import { NotificationModule } from '../notification/notification.module';

@Global()
@Module({
  imports: [
    UserModule,
    NotificationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    LocalStrategy,
    AuthRepository,
  ],
  exports: [
    AuthService,
    JwtService,
    JwtStrategy,
    LocalStrategy,
    AuthRepository,
  ],
})
export class AuthModule {}
