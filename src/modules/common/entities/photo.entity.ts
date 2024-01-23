// photo entity

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;
}
