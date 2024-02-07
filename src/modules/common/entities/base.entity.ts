import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @ApiProperty({ description: 'id', required: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'createdAt', required: true })
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @ApiProperty({ description: 'updatedAt', required: true })
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;
}
