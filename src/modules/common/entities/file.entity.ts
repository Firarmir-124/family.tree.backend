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

  @ApiProperty()
  @Prop({ required: false, unique: false, type: String })
  title: string;

  @ApiProperty()
  @Prop({ required: false, unique: false, type: String })
  description: string;
}

export const FileEntity = {
  name: 'Files',
  schema: SchemaFactory.createForClass(Files),
};
