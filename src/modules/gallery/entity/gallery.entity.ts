import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../../../global/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FamilyTree } from '../../familyTree/entities/familyTree.entity';
import { Files } from '../../common/entities/file.entity';
import { User } from '../../user/entities/user.entity';

@Schema()
export class Gallery extends Base {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: FamilyTree.name, required: false })
  descendant: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: Files.name, required: false })
  images: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: User.name, required: false })
  userCreated: User;
}
export const GalleryEntity = {
  name: 'Gallery',
  schema: SchemaFactory.createForClass(Gallery),
};
