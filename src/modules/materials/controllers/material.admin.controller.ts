import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';

@Controller({
  version: '1',
  path: 'material',
})
@ApiTags('admin.material')
export class MaterialAdminController {
  constructor(private readonly materialService: MaterialService) {}

  @Get('')
  async findAll() {
    // TODO: pagination
    return this.materialService.getGroups();
  }

  @Get('total')
  async getTotal() {
    return this.materialService.getTotal();
  }

  @Post('create')
  async create(@Body() material: CreateMaterialDto) {
    return this.materialService.create(material);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.materialService.remove(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() material: UpdateMaterialDto) {
    return this.materialService.update(id, material);
  }

  @Post('save')
  async save(@Body() groups: UpdateGroupDto[]) {
    return this.materialService.saveGroups(groups);
  }
}
