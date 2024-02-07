import { Injectable } from '@nestjs/common';
import { DictionaryType } from '../interfaces/dictionary-type.interface';
import { DictionaryEntity } from '../entities/dictionary.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryRepository: Repository<DictionaryEntity>,
  ) {}
  private cache: any = {
    [DictionaryType.DISTRICT]: [],
  };

  async getCache(type: DictionaryType) {
    if (this.cache[type].length === 0) {
      this.cache[type] = await this.findAll(type);
    }
    return this.cache[type];
  }

  async create(type: DictionaryType, key: string, value: string) {
    return this.dictionaryRepository.create({
      type,
      key,
      value,
    });
  }

  async findAll(type: DictionaryType) {
    return this.dictionaryRepository.find({ where: { type } });
  }

  async getTotal(type: DictionaryType): Promise<number> {
    return this.dictionaryRepository.count({ where: { type } });
  }

  async update(id: number, key: string, value: string) {
    return this.dictionaryRepository.update({ id }, { key, value });
  }

  async remove(id: number) {
    return this.dictionaryRepository.delete({ id });
  }
}
