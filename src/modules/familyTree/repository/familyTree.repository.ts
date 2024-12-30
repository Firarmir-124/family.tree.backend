import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { FamilyTree, FamilyTreeEntity } from '../entities/familyTree.entity';
import { CreateSpouseDto } from '../dto/create-spouse.dto';
import { FamilyTreeType, QueryFamilyType } from '../types/types';

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

  public async findAllFamilyTree(
    query: QueryFamilyType,
  ): Promise<FamilyTreeType[]> {
    try {
      return this.familyTreeRepository.find(query);
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
      const descendants = await this.familyTreeRepository.find({ parent: _id });

      await this.familyTreeRepository.deleteOne({ _id });

      for (const descendant of descendants) {
        await this.removeFamily(descendant._id.toString());
      }
      return _id;
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
