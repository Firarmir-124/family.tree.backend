// photo entity

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalEntity } from '../../proposal/entities/proposal.entity';

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

  @ManyToOne(() => ProposalEntity, (proposal) => proposal.photos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  proposal: number;
}
