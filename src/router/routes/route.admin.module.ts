import { Module } from '@nestjs/common';
import { UserAdminController } from '../../modules/user/controllers/user.admin.controller';
import { UserModule } from '../../modules/user/user.module';
import { ProposalAdminController } from '../../modules/proposal/controllers/proposal.admin.controller';
import { ProposalModule } from '../../modules/proposal/proposal.module';
import { DictionaryModule } from '../../modules/dictionary/dictionary.module';
import { DictionaryAdminController } from '../../modules/dictionary/controllers/dictionary.admin.controller';
import { CommonAdminController } from '../../modules/common/controllers/common.admin.controller';
import { PageAdminController } from '../../modules/page/controllers/page.admin.controller';
import { InformationModule } from '../../modules/information/information.module';
import { InformationAdminController } from '../../modules/information/controllers/information.admin.controller';
import { UsefulResourcesAdminController } from '../../modules/useful-resources/controllers/useful-resources.admin.controller';
import { UsefulResourcesModule } from '../../modules/useful-resources/useful-resources.module';

@Module({
  imports: [
    UserModule,
    ProposalModule,
    DictionaryModule,
    InformationModule,
    UsefulResourcesModule,
  ],
  controllers: [
    UserAdminController,
    ProposalAdminController,
    DictionaryAdminController,
    CommonAdminController,
    PageAdminController,
    InformationAdminController,
    UsefulResourcesAdminController,
  ],
  providers: [],
})
export class RouteAdminModule {}
