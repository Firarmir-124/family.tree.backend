import { Module } from '@nestjs/common';
import { CommonService } from './service/common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseEntity } from './entities/base.entity';
import { FileEntity } from './entities/file.entity';
import { GeneralDatesEntity } from './entities/generalData.entity';

@Module({
  imports: [
    MongooseModule.forFeature([BaseEntity, FileEntity, GeneralDatesEntity]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
