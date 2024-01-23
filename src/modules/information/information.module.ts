import {Module} from "@nestjs/common";
import {InformationEntity} from "./entities/information.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InformationService} from "./services/information.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([InformationEntity]),
  ],
  controllers: [],
  providers: [
    InformationService,
  ],
  exports: [],
})
export class InformationModule {}
