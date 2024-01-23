import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { ProposalModule } from '../../modules/proposal/proposal.module';
import { ProposalPublicController } from '../../modules/proposal/controllers/proposal.public.controller';
import { DictionaryModule } from '../../modules/dictionary/dictionary.module';
import { DictionaryPublicController } from '../../modules/dictionary/controllers/dictionary.public.controller';

@Module({
  imports: [UserModule, ProposalModule, DictionaryModule],
  controllers: [
    ProposalPublicController,
    DictionaryPublicController,
  ],
  providers: [],
})
export class RoutePublicModule {}
