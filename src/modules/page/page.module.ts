import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './entities/page.entity';
import { PageRepository } from './repositories/page.repository';
import { PageService } from './services/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  providers: [PageRepository, PageService],
})
export class PageModule {}
