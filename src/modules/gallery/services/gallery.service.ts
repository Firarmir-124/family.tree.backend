import { Injectable } from '@nestjs/common';
import { GalleryRepository } from '../repositories/gallery.repository';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { Gallery } from '../entity/gallery.entity';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { Types } from 'mongoose';
import { IUser } from '../../user/types';
import { QueryGallery } from '../dto/query-gallery';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  public async createGallery(
    createGalleryDto: CreateGalleryDto,
    user: IUser,
  ): Promise<Gallery> {
    const descendant = createGalleryDto.descendant
      ? new Types.ObjectId(createGalleryDto.descendant)
      : null;

    const images = createGalleryDto.images
      ? createGalleryDto.images.map((imageId) => new Types.ObjectId(imageId))
      : [];

    const galleryData = {
      ...createGalleryDto,
      descendant,
      images,
    };

    const getGalleryByDescendant =
      await this.galleryRepository.getGalleryDescendant(galleryData.descendant);

    if (getGalleryByDescendant) {
      return this.galleryRepository.createGalleryImage(
        galleryData.images,
        getGalleryByDescendant._id,
      );
    }

    return this.galleryRepository.createGallery(galleryData, user);
  }

  public async getGallery(
    pagination: PaginationDto,
    query: QueryGallery,
  ): Promise<Gallery[]> {
    return this.galleryRepository.getGallery(pagination, query);
  }

  public async updateGallery(
    updateGallery: UpdateGalleryDto,
    id: string,
  ): Promise<Gallery> {
    return this.galleryRepository.updateGallery(updateGallery, id);
  }

  public async removeGallery(id: string): Promise<string> {
    return this.galleryRepository.removeGallery(id);
  }

  public async removeGalleryImage(
    idGallery: string,
    idImage: string,
  ): Promise<Gallery> {
    return this.galleryRepository.removeGalleryImage(idGallery, idImage);
  }
}
