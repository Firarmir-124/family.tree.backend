import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from './router/router.module';
import { HelperModule } from './helpers/helper.module';
import { UserModule } from './modules/user/user.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    // typeorm connection to postgresql
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'postgres',
        database: configService.get<string>('DB_DATABASE') || 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || true,
        logging: configService.get<boolean>('DB_LOGGING') || false,
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST') || './uploads',
      }),
      inject: [ConfigService],
    }),
    HelperModule,
    DictionaryModule,
    UserModule,
    ProposalModule,
    AuthModule,
    RouterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
