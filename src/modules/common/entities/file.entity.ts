import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Files {
  @ApiProperty()
  @Prop({ required: true, unique: false, type: String })
  type: string;

  @ApiProperty()
  @Prop({ required: true, unique: false, type: String })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: false, type: String })
  path: string;
}

export const FileEntity = {
  name: 'file_entity',
  schema: SchemaFactory.createForClass(Files),
};
