import { Module } from '@nestjs/common';
import { GalleryService } from './services/gallery.service';
import { GalleryRepository } from './repositories/gallery.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryEntity } from './entity/gallery.entity';
import { FileEntity } from '../common/entities/file.entity';

@Module({
  imports: [MongooseModule.forFeature([GalleryEntity, FileEntity])],
  providers: [GalleryService, GalleryRepository],
  exports: [GalleryService, GalleryRepository, MongooseModule],
})
export class GalleryModule {}
