import { Controller, Get, Param } from '@nestjs/common';
import { InformationEntity } from '../entities/information.entity';
import { ApiTags } from '@nestjs/swagger';
import { IdParamDto } from '../../../global/dtos/id-param.dto';
import { ApiFindOneInformation } from '../decorators/find-one-information.decorator';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { ApiFindAllInformations } from '../decorators/find-all-information-for.decorator';
import { FindAllInformationResponseDto } from '../dto/find-all-information-response.dto';
import { InformationService } from '../services/information.service';

@Controller({
  version: '1',
  path: 'information',
})
@ApiTags('public.information')
export class InformationPublicController {
  constructor(private readonly informationService: InformationService) {}

  @Get(':id')
  @ApiFindOneInformation()
  public async findOneOrFail(
    @Param() params: IdParamDto,
  ): Promise<InformationEntity> {
    return this.informationService.findOneOrFail(params.id);
  }

  @Get()
  @ApiFindAllInformations()
  public async findAll(
    @Pagination() pagination: PaginationDto,
  ): Promise<FindAllInformationResponseDto> {
    return this.informationService.findAll(pagination);
  }
}
