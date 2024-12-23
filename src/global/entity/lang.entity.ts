import { ApiHideProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Lang {
  @ApiHideProperty()
  @Prop({ default: 'ru', enum: ['ru', 'en', 'ky'] })
  lang: string;
}
