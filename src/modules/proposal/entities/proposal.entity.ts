// proposal entity for postgres
// Path: src/modules/proposal/entities/proposal.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoEntity } from '../../common/entities/photo.entity';

@Entity()
export class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  geo: string;

  @OneToMany(() => PhotoEntity, (photo) => photo.id)
  @Column()
  photos: PhotoEntity[];
}
