import { Module } from '@nestjs/common';
import { ProposalService } from "./services/proposal.service";
import {ProposalEntity} from "./entities/proposal.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "./entities/message.entity";
import {MessageService} from "./services/message.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalEntity, MessageEntity]),
  ],
  controllers: [],
  providers: [ProposalService, MessageService],
  exports: [ProposalService, MessageService],
})
export class ProposalModule {}
