// dictionary entity for postgres
// Path: src/modules/dictionary/entities/dictionary.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'dictionary',
})
export class DictionaryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  key: string;

  @ApiProperty()
  @Column()
  value: string;
}
