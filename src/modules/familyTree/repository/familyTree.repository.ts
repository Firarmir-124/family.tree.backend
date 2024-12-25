import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { FamilyTree, FamilyTreeEntity } from '../entities/familyTree.entity';
import { CreateSpouseDto } from '../dto/create-spouse.dto';
import { FamilyTreeType } from '../types/types';

export class FamilyTreeRepository {
  constructor(
    @InjectModel(FamilyTreeEntity.name)
    private readonly familyTreeRepository: Model<FamilyTree>,
  ) {}

  public async createSpouse(
    info: CreateSpouseDto,
    id: string,
  ): Promise<FamilyTree> {
    try {
      await this.familyTreeRepository.updateOne({ _id: id }, { spouse: info });
      return this.familyTreeRepository.findOne({ _id: id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createFamily(family: CreateFamilyDto): Promise<FamilyTree> {
    try {
      return this.familyTreeRepository.create(family);
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAllFamilyTree(): Promise<FamilyTreeType[]> {
    try {
      return this.familyTreeRepository.find();
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneFamily(_id: string): Promise<FamilyTree> {
    try {
      return this.familyTreeRepository.findOne({ _id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateFamily(
    _id: string,
    info: UpdateFamilyDto,
  ): Promise<FamilyTree> {
    try {
      await this.familyTreeRepository.updateOne({ _id }, { $set: info });
      return this.familyTreeRepository.findOne({ _id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeFamily(_id: string): Promise<string> {
    try {
      await this.familyTreeRepository.deleteOne({ _id });
      return _id;
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
