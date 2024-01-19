import { Module } from '@nestjs/common';
import { DictionaryService } from "./services/dictionary.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DictionaryEntity, DictionarySchema } from "./entities/dictionary.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DictionaryEntity.name, schema: DictionarySchema }]),
  ],
  controllers: [],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
