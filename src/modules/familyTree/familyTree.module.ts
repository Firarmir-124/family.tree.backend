import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamilyTreeEntity } from './entities/familyTree.entity';
import { FamilyTreeRepository } from './repository/familyTree.repository';
import { FamilyTreeService } from './services/familyTree.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([FamilyTreeEntity]),
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
  providers: [FamilyTreeRepository, FamilyTreeService],
  exports: [MongooseModule, FamilyTreeRepository, FamilyTreeService],
})
export class FamilyTreeModule {}
