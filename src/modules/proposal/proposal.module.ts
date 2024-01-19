import { Module } from '@nestjs/common';
import { ProposalService } from "./services/proposal.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProposalEntity, ProposalSchema } from "./entities/proposal.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProposalEntity.name, schema: ProposalSchema }]),
  ],
  controllers: [],
  providers: [ProposalService],
  exports: [ProposalService, MongooseModule],
})
export class ProposalModule {}
