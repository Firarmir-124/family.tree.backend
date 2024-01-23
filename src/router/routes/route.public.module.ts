import { Module } from '@nestjs/common';
import { UserPublicController } from '../../modules/user/controllers/user.public.controller';
import { UserModule } from '../../modules/user/user.module';
import { ProposalModule } from '../../modules/proposal/proposal.module';
import { ProposalPublicController } from '../../modules/proposal/controllers/proposal.public.controller';
import { DictionaryModule } from '../../modules/dictionary/dictionary.module';
import { DictionaryPublicController } from '../../modules/dictionary/controllers/dictionary.public.controller';
import { PagePublicController } from '../../modules/page/controllers/page.public.controller';

@Module({
  imports: [UserModule, ProposalModule, DictionaryModule],
  controllers: [
    UserPublicController,
    ProposalPublicController,
    DictionaryPublicController,
    PagePublicController,
  ],
  providers: [],
})
export class RoutePublicModule {}
