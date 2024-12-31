import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { FamilyTreeRepository } from '../repository/familyTree.repository';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { FamilyTree } from '../entities/familyTree.entity';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { CreateSpouseDto } from '../dto/create-spouse.dto';
import {
  FamilyTreeMutationType,
  FamilyTreeType,
  QueryFamilyType,
} from '../types/types';

@Injectable()
export class FamilyTreeService {
  constructor(private readonly familyTreeRepository: FamilyTreeRepository) {}

  public async createSpouse(
    info: CreateSpouseDto,
    id: string,
  ): Promise<FamilyTree> {
    if (!id) {
      throw new BadRequestException(`id ${id} not found`);
    }

    const checkId = mongoose.Types.ObjectId.isValid(id);

    if (!checkId) {
      throw new BadRequestException();
    }

    return this.familyTreeRepository.createSpouse(info, id);
  }

  public async create(
    info: CreateFamilyDto,
    userId: string,
  ): Promise<FamilyTree> {
    return this.familyTreeRepository.createFamily(info, userId);
  }

  public async findAllFamilyTree(
    query: QueryFamilyType,
  ): Promise<FamilyTreeMutationType[]> {
    const familyTreeList =
      await this.familyTreeRepository.findAllFamilyTree(query);

    const buildTree = (
      data: FamilyTreeType[],
      parentId: string | null = null,
    ) => {
      return data
        .filter((item) =>
          item.parent ? item.parent.toString() === parentId : parentId === null,
        )
        .map((item) => {
          const newItem = {
            _id: item._id,
            name: item.name,
            photo: item.photo,
            dob: item.dob,
            dod: item.dod,
            description: item.description,
            genus: item.genus,
            type: item.type,
            spouse: item.spouse,
            created: item.created,
            updated: item.updated,
          };
          return {
            ...newItem,
            children: buildTree(data, item._id.toString()), // Преобразуем _id в строку
          };
        });
    };

    return !query.name
      ? buildTree(familyTreeList)
      : familyTreeList.map((item) => {
          const newItem = {
            _id: item._id,
            name: item.name,
            photo: item.photo,
            dob: item.dob,
            dod: item.dod,
            description: item.description,
            genus: item.genus,
            type: item.type,
            spouse: item.spouse,
            created: item.created,
            updated: item.updated,
          };
          return {
            ...newItem,
            children: [],
          };
        });
  }

  public async findOne(id: string): Promise<FamilyTree> {
    const checkId = mongoose.Types.ObjectId.isValid(id);

    if (!checkId) {
      throw new BadRequestException();
    }

    const family = await this.familyTreeRepository.findOneFamily(id);

    if (!family) {
      throw new BadRequestException();
    }

    return family;
  }

  public async update(id: string, info: UpdateFamilyDto): Promise<FamilyTree> {
    const checkId = mongoose.Types.ObjectId.isValid(id);

    if (!checkId) {
      throw new BadRequestException();
    }

    return this.familyTreeRepository.updateFamily(id, info);
  }

  public async remove(id: string): Promise<string> {
    return this.familyTreeRepository.removeFamily(id);
  }
}
