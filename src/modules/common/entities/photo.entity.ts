// photo entity

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class FilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  path: string;
}
