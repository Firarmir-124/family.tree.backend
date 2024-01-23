import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsefulResourcesEntity } from './entities/useful-resources.entity';
import { UsefulResourcesService } from './services/useful-resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsefulResourcesEntity])],
  controllers: [],
  providers: [UsefulResourcesService],
  exports: [UsefulResourcesService],
})
export class UsefulResourcesModule {}
