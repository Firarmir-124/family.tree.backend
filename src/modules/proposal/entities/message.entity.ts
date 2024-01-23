// proposal entity for postgres
// Path: src/modules/proposal/entities/proposal.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  message: string;
}
