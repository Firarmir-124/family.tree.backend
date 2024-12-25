import { ApiProperty } from '@nestjs/swagger';
import { UpdateDateColumn } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Base {
  @ApiProperty({ description: 'createdAt', required: true })
  @Prop({ required: true, default: () => new Date() })
  created: Date;

  @Prop({ required: true, default: () => new Date() })
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;
}

export const BaseEntity = {
  name: 'base_entity',
  schema: SchemaFactory.createForClass(Base),
};
