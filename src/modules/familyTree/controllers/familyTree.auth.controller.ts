import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { FamilyTree } from '../entities/familyTree.entity';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { FamilyTreeService } from '../services/familyTree.service';
import { CreateSpouseDto } from '../dto/create-spouse.dto';
import { FamilyTreeMutationType, QueryFamilyType } from '../types/types';

@Controller({
  version: '1',
  path: 'familyTree',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('auth.familyTree')
@ApiBearerAuth('access-token')
export class FamilyTreeAuthController {
  constructor(private readonly familyTreeService: FamilyTreeService) {}

  @Post('spouse')
  public createSpouse(
    @Body() createSpouseDto: CreateSpouseDto,
    @Query('id') id: string,
  ): Promise<FamilyTree> {
    return this.familyTreeService.createSpouse(createSpouseDto, id);
  }

  @Post()
  public create(@Body() createFamilyDto: CreateFamilyDto): Promise<FamilyTree> {
    console.log('createFamilyDto', createFamilyDto);
    return this.familyTreeService.create(createFamilyDto);
  }

  @Get()
  public findAllFamilyTree(
    @Query('name') name: string,
  ): Promise<FamilyTreeMutationType[]> {
    const query = {} as QueryFamilyType;

    if (name) {
      query['name'] = { $regex: `^${name}`, $options: 'i' };
    }

    return this.familyTreeService.findAllFamilyTree(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<FamilyTree> {
    return this.familyTreeService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateFamilyDto: UpdateFamilyDto,
  ): Promise<FamilyTree> {
    return this.familyTreeService.update(id, updateFamilyDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<string> {
    return this.familyTreeService.remove(id);
  }
}
