import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsefulResourcesService } from '../services/useful-resources.service';
import { ApiFindAllUsefulResources } from '../decorators/find-all-useful-resources.decorator';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { ApiFindOneUsefulResources } from '../decorators/find-one-useful-resources.decorator';
import { IdParamDto } from '../../../global/dtos/id-param.dto';

@Controller({
  path: 'useful-resources',
  version: '1',
})
@ApiTags('public.useful-resources')
export class UsefulResourcesPublicController {
  constructor(
    private readonly usefulResourcesService: UsefulResourcesService,
  ) {}

  @Get()
  @ApiFindAllUsefulResources()
  public async findAll(
    @Pagination() pagination: PaginationDto,
  ): Promise<UsefulResourcesEntity[]> {
    return [new UsefulResourcesEntity()];
  }

  @Get(':id')
  @ApiFindOneUsefulResources()
  public async findOneOrFail(@Param() params: IdParamDto): Promise<UsefulResourcesEntity> {
    return new UsefulResourcesEntity();
  }
}
