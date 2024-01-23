// information entity for postgres
// Path: src/modules/information/entities/information.entity.ts
// Compare this snippet from src/modules/dictionary/dictionary.module.ts:

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'information',
})
export class InformationEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  created: Date;

  @ApiProperty()
  @Column()
  updated: Date;

  @ApiProperty()
  @Column()
  district: string;
}
