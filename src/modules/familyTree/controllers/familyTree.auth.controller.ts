import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: '1',
  path: 'familyTree',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('auth.familyTree')
@ApiBearerAuth('access-token')
export class FamilyTreeAuthController {
  constructor(
    private readonly familyTreeService: FamilyTreeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('spouse')
  public createSpouse(
    @Body() createSpouseDto: CreateSpouseDto,
    @Query('id') id: string,
  ): Promise<FamilyTree> {
    return this.familyTreeService.createSpouse(createSpouseDto, id);
  }

  @Post()
  public async create(
    @Body() createFamilyDto: CreateFamilyDto,
    @Req() req: Request,
  ): Promise<FamilyTree> {
    const token = req.headers['authorization'].split(' ')[1];
    const { _id } = await this.jwtService.verifyAsync(token, {
      ignoreExpiration: true,
      secret: this.configService.get('JWT_SECRET'),
    });

    return this.familyTreeService.create(createFamilyDto, _id);
  }

  @Get()
  public async findAllFamilyTree(
    @Query('name') name: string,
    @Query('userId') userId: string,
    @Req() req: Request,
  ): Promise<FamilyTreeMutationType[]> {
    const token = req.headers['authorization'].split(' ')[1];
    const { _id } = await this.jwtService.verifyAsync(token, {
      ignoreExpiration: true,
      secret: this.configService.get('JWT_SECRET'),
    });

    const query = {
      userCreated: !userId ? _id : userId,
    } as QueryFamilyType;

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
