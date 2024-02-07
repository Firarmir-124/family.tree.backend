import { Module } from '@nestjs/common';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryEntity } from './entities/dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
