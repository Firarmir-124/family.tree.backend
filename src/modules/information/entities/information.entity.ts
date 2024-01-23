// information entity for postgres
// Path: src/modules/information/entities/information.entity.ts
// Compare this snippet from src/modules/dictionary/dictionary.module.ts:

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InformationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  created: Date;

  @Column()
  updated: Date;

  @Column()
  district: string;
}
