// dictionary entity for postgres
// Path: src/modules/dictionary/entities/dictionary.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'dictionary',
})
export class DictionaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  key: string;

  @Column()
  value: string;
}
