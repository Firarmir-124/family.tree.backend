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
import { PageModule } from '../../modules/page/page.module';
import { CommonModule } from '../../modules/common/common.module';
import { CompanyModule } from '../../modules/company/company.module';
import { CompanyAdminController } from '../../modules/company/controller/company.admin.controller';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MaterialAdminController } from '../../modules/materials/controllers/material.admin.controller';

@Module({
  imports: [
    UserModule,
    ProposalModule,
    DictionaryModule,
    InformationModule,
    UsefulResourcesModule,
    PageModule,
    CommonModule,
    CompanyModule,
    MaterialsModule,
  ],
  controllers: [
    UserAdminController,
    ProposalAdminController,
    DictionaryAdminController,
    CommonAdminController,
    PageAdminController,
    InformationAdminController,
    UsefulResourcesAdminController,
    PageAdminController,
    CompanyAdminController,
    MaterialAdminController,
  ],
  providers: [],
})
export class RouteAdminModule {}
