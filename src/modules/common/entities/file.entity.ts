// photo entity

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalEntity } from '../../proposal/entities/proposal.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { MaterialEntity } from '../../materials/entities/material.entity';

@Entity({
  name: 'files',
})
export class FilesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  path: string;

  @ApiHideProperty()
  @ManyToOne(() => ProposalEntity, (proposal) => proposal.photos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  proposal: number | null;

  @ApiHideProperty()
  @ManyToOne(() => MaterialEntity, (material) => material.files, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  material: number | null;
}
