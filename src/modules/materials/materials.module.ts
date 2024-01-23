import {Module} from "@nestjs/common";
import {MaterialGroupEntity} from "./entities/material-group.entity";
import {MaterialEntity} from "./entities/material.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity, MaterialGroupEntity]),
  ],
  controllers: [],
  providers: [

  ],
  exports: [],
})
export class MaterialsModule {}
