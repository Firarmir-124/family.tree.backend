import { Module } from '@nestjs/common';
import { MaterialGroupEntity } from './entities/material-group.entity';
import { MaterialEntity } from './entities/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialService } from './services/material.service';
import { FilesEntity } from '../common/entities/file.entity';
import { CommonService } from '../common/service/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialEntity,
      MaterialGroupEntity,
      FilesEntity,
    ]),
  ],
  providers: [MaterialService, CommonService],
  exports: [MaterialService],
})
export class MaterialsModule {}
