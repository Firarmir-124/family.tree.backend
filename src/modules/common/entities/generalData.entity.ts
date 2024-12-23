import { ApiProperty } from '@nestjs/swagger';
import { Files } from './file.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class GeneralDates {
  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiProperty()
  @Prop({ required: true, unique: false, type: String })
  title: string;

  @ApiProperty()
  @Prop({ required: true, unique: false, type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Files.name })
  file: Files;
}

export const GeneralDatesEntity = {
  name: 'general_dates_entity',
  schema: SchemaFactory.createForClass(GeneralDates),
};
