import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialEntity } from '../entities/material.entity';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { MaterialGroupEntity } from '../entities/material-group.entity';
import { CreateGroupMaterialDto } from '../dto/create-group-material.dto';
import { CommonService } from '../../common/service/common.service';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(MaterialGroupEntity)
    private readonly materialGroupRepository: Repository<MaterialGroupEntity>,
    private readonly commonService: CommonService,
  ) {}

  async createGroupMaterial(
    createGroup: CreateGroupMaterialDto,
  ): Promise<MaterialGroupEntity> {
    return await this.materialGroupRepository.save(createGroup);
  }
  async findAll() {
    return this.materialRepository.find();
  }

  async getTotal() {
    return this.materialRepository.count();
  }

  async createMaterial(
    id: number,
    material: CreateMaterialDto,
    files: Express.Multer.File[],
  ): Promise<MaterialEntity> {
    const groupMaterialOne = await this.materialGroupRepository.findOne({
      where: { id },
    });

    if (!groupMaterialOne) {
      throw new BadRequestException('группа не найдена');
    }

    const createdMaterial = await this.materialRepository.save({
      ...material,
      groupMaterial: groupMaterialOne,
    });

    return createdMaterial;
  }

  async update(id: number, material: UpdateMaterialDto) {
    return this.materialRepository.update({ id }, material);
  }

  async remove(id: number) {
    return this.materialRepository.delete({ id });
  }

  // async getGroups() {
  //   const groups = await this.materialGroupRepository.find();
  //   const materials = await this.materialRepository.find();
  //   return groups.map((group) => {
  //     return {
  //       id: group.id,
  //       title: group.title,
  //       materials: JSON.parse(group.materials).map((materialId) => {
  //         return materials.find((material) => material.id === materialId);
  //       }),
  //     };
  //   });
  // }
  //
  // async saveGroups(groups: UpdateGroupDto[]) {
  //   for (const group of groups) {
  //     const save = {
  //       title: group.title,
  //       materials: JSON.stringify(group.materials),
  //       order: group.order,
  //     };
  //     if (group.id) {
  //       await this.materialGroupRepository.update({ id: group.id }, save);
  //     } else {
  //       await this.materialGroupRepository.save(save);
  //     }
  //   }
  // }
}
