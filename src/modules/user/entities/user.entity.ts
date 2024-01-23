// user entity
// Path: src/modules/user/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../interfaces/roles.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  role: UserRole;

  @Column()
  salt: string;

  @Column()
  active: boolean;

  @Column()
  created: Date;

  @Column()
  updated: Date;
}
