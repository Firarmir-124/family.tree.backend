import { Base } from '../../../global/entity/base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GenusEnum } from '../enums/genus.enum';
import { Types } from 'mongoose';
import { TypeEnum } from '../enums/type.enum';

@Schema()
export class FamilyTree extends Base {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  photo: string;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  dob: string;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  dod: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  description: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: GenusEnum,
    default: GenusEnum.MALE,
    required: true,
  })
  genus: GenusEnum;

  @ApiProperty()
  @Prop({
    type: String,
    enum: TypeEnum,
    required: false,
  })
  type: TypeEnum;

  @ApiProperty()
  @Prop({ type: Object, required: false })
  spouse: object;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: FamilyTree.name, required: false })
  parent: Types.ObjectId;
}

export const FamilyTreeEntity = {
  name: 'FamilyTree',
  schema: SchemaFactory.createForClass(FamilyTree),
};
