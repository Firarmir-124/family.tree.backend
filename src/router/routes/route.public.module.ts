import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { ProposalModule } from '../../modules/proposal/proposal.module';
import { ProposalPublicController } from '../../modules/proposal/controllers/proposal.public.controller';
import { DictionaryModule } from '../../modules/dictionary/dictionary.module';
import { DictionaryPublicController } from '../../modules/dictionary/controllers/dictionary.public.controller';
import { PagePublicController } from '../../modules/page/controllers/page.public.controller';
import { InformationPublicController } from '../../modules/information/controllers/information.public.controller';
import { InformationModule } from '../../modules/information/information.module';
import { UsefulResourcesPublicController } from '../../modules/useful-resources/controllers/useful-resources.public.controller';
import { UsefulResourcesModule } from '../../modules/useful-resources/useful-resources.module';
import { PageModule } from '../../modules/page/page.module';
import { CompanyPublicController } from '../../modules/company/controller/company.public.controller';
import { CompanyModule } from '../../modules/company/company.module';

@Module({
  imports: [
    UserModule,
    ProposalModule,
    DictionaryModule,
    InformationModule,
    UsefulResourcesModule,
    PageModule,
    CompanyModule,
  ],
  controllers: [
    ProposalPublicController,
    DictionaryPublicController,
    PagePublicController,
    InformationPublicController,
    UsefulResourcesPublicController,
    PagePublicController,
    CompanyPublicController,
  ],
  providers: [],
})
export class RoutePublicModule {}
