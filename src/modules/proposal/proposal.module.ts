import { Module } from '@nestjs/common';
import { ProposalService } from './services/proposal.service';
import { ProposalEntity } from './entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './services/message.service';
import { CommonService } from '../common/service/common.service';
import { FilesEntity } from '../common/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalEntity, MessageEntity, FilesEntity]),
  ],
  controllers: [],
  providers: [ProposalService, MessageService, CommonService],
  exports: [ProposalService, MessageService],
})
export class ProposalModule {}
