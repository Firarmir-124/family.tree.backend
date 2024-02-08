// user entity
// Path: src/modules/user/entities/user.entity.ts

import { Column, Entity } from 'typeorm';
import { UserRole } from '../interfaces/roles.enum';
import { Base } from '../../common/entities/base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class UserEntity extends Base {
  @ApiProperty()
  @Column()
  username: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  role: UserRole;

  @ApiHideProperty()
  @Column()
  salt: string;

  @ApiProperty()
  @Column()
  active: boolean;
}
