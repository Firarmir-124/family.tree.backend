import { Gallery } from './entity/gallery.entity';
import { Types } from 'mongoose';

export interface GalleryType extends Gallery {
  _id: Types.ObjectId;
}
