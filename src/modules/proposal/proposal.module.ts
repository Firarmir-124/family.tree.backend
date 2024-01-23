import { Module } from '@nestjs/common';
import { ProposalService } from "./services/proposal.service";
import {ProposalEntity} from "./entities/proposal.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "./entities/message.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalEntity, MessageEntity]),
  ],
  controllers: [],
  providers: [ProposalService],
  exports: [ProposalService],
})
export class ProposalModule {}
