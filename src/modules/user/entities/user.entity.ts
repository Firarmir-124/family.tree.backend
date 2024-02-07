// user entity
// Path: src/modules/user/entities/user.entity.ts

import { Column, Entity } from 'typeorm';
import { UserRole } from '../interfaces/roles.enum';
import { Base } from '../../common/entities/base.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends Base {
  @Column()
  username: string;

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
}
