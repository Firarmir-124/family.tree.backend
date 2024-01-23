import {Module} from "@nestjs/common";
import {MaterialGroupEntity} from "./entities/material-group.entity";
import {MaterialEntity} from "./entities/material.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MaterialService} from "./services/material.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity, MaterialGroupEntity]),
  ],
  controllers: [],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialsModule {}
