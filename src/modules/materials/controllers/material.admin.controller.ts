import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { CreateGroupMaterialDto } from '../dto/create-group-material.dto';
import { FastifyFilesInterceptor } from '../../common/decorators/fastifys.decorator';
import multer, { Multer } from 'multer';

@Controller({
  version: '1',
  path: 'material',
})
@ApiTags('admin.material')
export class MaterialAdminController {
  constructor(private readonly materialService: MaterialService) {}

  // @Get('')
  // async findAll() {
  //   // TODO: pagination
  //   return this.materialService.getGroups();
  // }

  @Get('total')
  async getTotal() {
    return this.materialService.getTotal();
  }

  @Post('group')
  async createGroupMaterial(@Body() createGroup: CreateGroupMaterialDto) {
    return this.materialService.createGroupMaterial(createGroup);
  }

  @UseInterceptors(FastifyFilesInterceptor('files', 10, './uploads'))
  @Post('create/:id')
  async createMaterial(
    @Param('id') id: number,
    @Body() material: CreateMaterialDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.materialService.createMaterial(id, material, files);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.materialService.remove(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() material: UpdateMaterialDto) {
    return this.materialService.update(id, material);
  }

  // @Post('save')
  // async save(@Body() groups: UpdateGroupDto[]) {
  //   return this.materialService.saveGroups(groups);
  // }
}
