import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Base {
  @ApiProperty({ description: 'createdAt', required: true })
  @Prop({ default: Date.now })
  created: Date;

  @ApiProperty({ description: 'updatedAt', required: true })
  @Prop({ default: Date.now })
  updated: Date;
}
