import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from "./router/router.module";
import { HelperModule } from "./helpers/helper.module";
import { EstateModule } from "./modules/estate/estate.module";
import { UserModule } from "./modules/user/user.module";
import { ProposalModule } from "./modules/proposal/proposal.module";
import { DictionaryModule } from "./modules/dictionary/dictionary.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
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
    EstateModule,
    ProposalModule,
    AuthModule,
    RouterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
