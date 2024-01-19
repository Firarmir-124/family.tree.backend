import { Injectable } from "@nestjs/common";
import { DictionaryType } from "../interfaces/dictionary-type.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DictionaryEntity } from "../entities/dictionary.entity";

@Injectable()
export class DictionaryService {
  constructor(
    @InjectModel(DictionaryEntity.name)
    private readonly dictionaryModel: Model<DictionaryEntity>,
  ) {
  }
  private cache: any = {
    [DictionaryType.DISTRICT]: [],
    [DictionaryType.ESTATE_TYPE]: [],
    [DictionaryType.TAGS]: [],
    [DictionaryType.VACANCIES]: [],
    [DictionaryType.INFO]: [],
    [DictionaryType.CERTS]: [],
  };

  async getCache(type: DictionaryType) {
    if (this.cache[type].length === 0) {
      this.cache[type] = await this.findAll(type);
    }
    return this.cache[type];
  }

  async create(type: DictionaryType, key: string, description: string) {
    return this.dictionaryModel.create({
      type,
      key,
      description,
    });
  }

  async findAll(type: DictionaryType, options = {}) {
    return this.dictionaryModel.find({ type }, null, options);
  }

  async getTotal(type: DictionaryType): Promise<number> {
    return this.dictionaryModel.count({ type });
  }

  async update(id: string, key: string, description: string) {
    return this.dictionaryModel.updateOne({ _id: id }, { key, description });
  }

  async remove(id: string) {
    return this.dictionaryModel.deleteOne({ _id: id });
  }
}