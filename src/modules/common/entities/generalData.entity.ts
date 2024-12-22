// photo entity

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FilesEntity } from './file.entity';

@Entity({
  name: 'generaldatas',
})
export class GeneralDatesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @OneToOne(() => FilesEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  file: FilesEntity;
}
