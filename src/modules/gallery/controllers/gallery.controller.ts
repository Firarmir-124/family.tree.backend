import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GalleryService } from '../services/gallery.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { Gallery } from '../entity/gallery.entity';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { Request } from 'express';
import { IUser } from '../../user/types';
import { Types } from 'mongoose';

@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'gallery',
  version: '1',
})
@ApiTags('gallery')
@ApiBearerAuth('access-token')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  public async getGallery(
    @Pagination() pagination: PaginationDto,
    @Req() request: Request,
    @Query('descendant') descendant: string,
  ): Promise<Gallery[]> {
    const user = request.user as IUser;
    const query = {
      userCreated: new Types.ObjectId(user._id),
    };

    if (descendant) {
      query['descendant'] = descendant;
    }

    return this.galleryService.getGallery(pagination, query);
  }

  @Post()
  public async createGallery(
    @Body() createGalleryDto: CreateGalleryDto,
    @Req() request: Request,
  ): Promise<Gallery> {
    const user = request.user as IUser;

    return this.galleryService.createGallery(createGalleryDto, user);
  }

  @Patch()
  public async updateGallery(
    @Body() updateGalleryDto: UpdateGalleryDto,
    @Param('id') id: string,
  ): Promise<Gallery> {
    return this.galleryService.updateGallery(updateGalleryDto, id);
  }

  @Delete('descendant/:id')
  public async removeGallery(@Param('id') id: string): Promise<string> {
    return this.galleryService.removeGallery(id);
  }

  @Delete('image')
  public async removeGalleryImage(
    @Query('idGallery') idGallery: string,
    @Query('idImage') idImage: string,
  ): Promise<Gallery> {
    return this.galleryService.removeGalleryImage(idGallery, idImage);
  }
}
