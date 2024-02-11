import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from './entities/file.entity';
import { CommonService } from './service/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity])],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
