import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from './entities/file.entity';
import { CommonService } from './service/common.service';
import { GeneralDatesEntity } from './entities/generalData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity, GeneralDatesEntity])],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
