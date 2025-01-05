import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FamilyTreeEntity } from '../familyTree/entities/familyTree.entity';
import { FamilyTreeService } from '../familyTree/services/familyTree.service';
import { FamilyTreeRepository } from '../familyTree/repository/familyTree.repository';

@Module({
  imports: [
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
    MongooseModule.forFeature([FamilyTreeEntity]),
  ],
  providers: [
    ChatGateway,
    ChatService,
    FamilyTreeService,
    FamilyTreeRepository,
  ],
  controllers: [],
})
export class ChatModule {}
