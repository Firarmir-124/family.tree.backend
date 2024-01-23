import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsefulResourcesService } from '../services/useful-resources.service';
import { ApiCreateUsefulResources } from '../decorators/create-useful-resources.decorator';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';
import { ApiUpdateUsefulResources } from '../decorators/update-useful-resources.decorator';
import { IdParamDto } from '../../../global/dtos/id-param.dto';
import { UpdateUsefuleResourcesReqDto } from '../dtos/update-useful-resources-req.dto';
import { ApiDeleteUsefulResources } from '../decorators/delete-useful-resources.decorator';
import { CreateUsefuleResourcesReqDto } from '../dtos/create-useful-resources-req.dto';

@Controller({
  path: 'useful-resources',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.useful-resources')
@ApiBearerAuth('access-token')
export class UsefulResourcesAdminController {
  constructor(
    private readonly usefulResourcesService: UsefulResourcesService,
  ) {}

  @Post()
  @ApiCreateUsefulResources()
  public async create(@Body() req: CreateUsefuleResourcesReqDto): Promise<UsefulResourcesEntity> {
    return new UsefulResourcesEntity();
  }

  @Patch(':id')
  @ApiUpdateUsefulResources()
  public async update(
    @Param() params: IdParamDto,
    @Body() req: UpdateUsefuleResourcesReqDto,
  ): Promise<UsefulResourcesEntity> {
    return new UsefulResourcesEntity();
  }

  @Delete(':id')
  @ApiDeleteUsefulResources()
  public async delete(@Param() params: IdParamDto): Promise<void> {
    return;
  }
}
