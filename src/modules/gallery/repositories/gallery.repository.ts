import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Gallery, GalleryEntity } from '../entity/gallery.entity';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { IUser } from '../../user/types';
import { QueryGallery } from '../dto/query-gallery';
import { GalleryType } from '../types';
import { FileEntity, Files } from '../../common/entities/file.entity';
import { ROOT } from '../../../main';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(GalleryEntity.name)
    private readonly galleryRepository: Model<Gallery>,
    @InjectModel(FileEntity.name)
    private readonly fileRepository: Model<Files>,
  ) {}

  public async getGalleryDescendant(
    descendant: Types.ObjectId,
  ): Promise<GalleryType> {
    try {
      return this.galleryRepository.findOne({ descendant });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getGallery(
    pagination: PaginationDto,
    query: QueryGallery,
  ): Promise<Gallery[]> {
    try {
      return this.galleryRepository
        .find(query)
        .sort({ created: -1 })
        .skip((pagination.page - 1) * pagination.perPage)
        .limit(pagination.perPage)
        .populate([{ path: 'descendant', select: 'name' }, { path: 'images' }]);
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createGalleryImage(
    images: Types.ObjectId[],
    idGallery: Types.ObjectId,
  ): Promise<Gallery> {
    try {
      return this.galleryRepository.findByIdAndUpdate(
        idGallery,
        { $push: { images: { $each: images } } },
        { new: true },
      );
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createGallery(
    gallery: CreateGalleryDto,
    user: IUser,
  ): Promise<Gallery> {
    try {
      return this.galleryRepository.create({
        ...gallery,
        userCreated: new Types.ObjectId(user._id),
      });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateGallery(
    gallery: UpdateGalleryDto,
    id: string,
  ): Promise<Gallery> {
    try {
      await this.galleryRepository.updateOne({ id }, { $set: gallery });
      return this.galleryRepository.findOne({ id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeGallery(id: string): Promise<string> {
    try {
      await this.galleryRepository.deleteOne({ _id: id });
      return id;
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeGalleryImage(
    idGallery: string,
    idImage: string,
  ): Promise<Gallery> {
    try {
      const fileOne = await this.fileRepository.findOne({ _id: idImage });

      const paths = [fileOne.path];

      paths.forEach((item) => {
        const file = path.join(ROOT, '..', item);

        if (
          file.includes(path.join(ROOT, '..', 'images')) &&
          fs.existsSync(file)
        ) {
          console.log('file', file);
          try {
            fs.unlinkSync(file);
            fs.rmdirSync(path.dirname(file));
          } catch (e) {
            console.log('e', e);
          }
        }
      });

      await this.fileRepository.deleteMany({ path: { $in: paths } });

      return await this.galleryRepository.findByIdAndUpdate(
        idGallery,
        { $pull: { images: new Types.ObjectId(idImage) } },
        { new: true },
      );
    } catch (e) {
      console.log('e', e);
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
