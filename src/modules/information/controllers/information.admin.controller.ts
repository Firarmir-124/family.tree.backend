import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InformationService } from '../services/information.service';
import { InformationEntity } from '../entities/information.entity';
import { CreateInformationReqDto } from '../dto/create-information-req.dto';
import { UpdateInformationReqDto } from '../dto/update-information-req.dto';
import { ApiCreateInformation } from '../decorators/create-information.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiUpdateInformation } from '../decorators/update-information.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiDeleteInformation } from '../decorators/delete-information.decorator';
import { ApiFindOneInformation } from '../decorators/find-one-information.decorator';
import { IdParamDto } from '../../../global/dtos/id-param.dto';

@Controller({
  version: '1',
  path: 'information',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.information')
@ApiBearerAuth('access-token')
export class InformationAdminController {
  constructor(private readonly informationService: InformationService) {}

  @Post()
  @ApiCreateInformation()
  public async create(
    @Body() req: CreateInformationReqDto,
  ): Promise<InformationEntity> {
    return this.informationService.create(req);
  }

  @Patch(':id')
  @ApiUpdateInformation()
  public async update(
    @Param() params: IdParamDto,
    @Body() req: UpdateInformationReqDto,
  ): Promise<InformationEntity> {
    return this.informationService.update(params.id, req);
  }

  @Delete(':id')
  @ApiDeleteInformation()
  public async delete(@Param() params: IdParamDto): Promise<void> {
    await this.informationService.remove(params.id);
  }

  @Get(':id')
  @ApiFindOneInformation()
  public async findOneOrFail(@Param() params: IdParamDto) {
    return await this.informationService.findOneOrFail(params.id);
  }
}
