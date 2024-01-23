import { Controller, Get, Param } from '@nestjs/common';
import { InformationEntity } from '../entities/information.entity';
import { ApiTags } from '@nestjs/swagger';
import { IdParamDto } from '../../../global/dtos/id-param.dto';

@Controller({
  version: '1',
  path: 'information',
})
@ApiTags('public.information')
export class InformationPublicController {
  constructor() {}

  @Get(':id')
  public async findOneOrFail(
    @Param() params: IdParamDto,
  ): Promise<InformationEntity> {
    return {} as InformationEntity;
  }
}
