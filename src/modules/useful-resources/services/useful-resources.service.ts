import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsefulResourcesService {
  @InjectRepository(UsefulResourcesEntity)
  private readonly usefulResourcesRepository: Repository<UsefulResourcesEntity>;
}
