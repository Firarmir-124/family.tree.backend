import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { ProposalModule } from '../../modules/proposal/proposal.module';
import { ProposalPublicController } from '../../modules/proposal/controllers/proposal.public.controller';
import { DictionaryModule } from '../../modules/dictionary/dictionary.module';
import { DictionaryPublicController } from '../../modules/dictionary/controllers/dictionary.public.controller';
import { PagePublicController } from '../../modules/page/controllers/page.public.controller';
import { InformationPublicController } from '../../modules/information/controllers/information.public.controller';
import { InformationModule } from '../../modules/information/information.module';

@Module({
  imports: [UserModule, ProposalModule, DictionaryModule, InformationModule],
  controllers: [
    ProposalPublicController,
    DictionaryPublicController,
    PagePublicController,
    InformationPublicController,
  ],
  providers: [],
})
export class RoutePublicModule {}
