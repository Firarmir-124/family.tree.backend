import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePageRequestDto } from '../dtos/create-request.dto';
import { UpdatePageRequestDto } from '../dtos/update-request.dto';
import { IdParamDto } from '../../../global/dtos/id-param.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageService } from '../services/page.service';
import { ApiCreatePage } from '../decorators/create-page.decorator';
import { ApiUpdatePage } from '../decorators/update-page.decorator';
import { ApiDeletePage } from '../decorators/delete-page.decorator';

@Controller({
  version: '1',
  path: 'page',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.page')
@ApiBearerAuth('access-token')
export class PageAdminController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @ApiCreatePage()
  async create(@Body() request: CreatePageRequestDto) {
    return this.pageService.create(request);
  }

  @Patch(':id')
  @ApiUpdatePage()
  async update(
    @Param() params: IdParamDto,
    @Body() request: UpdatePageRequestDto,
  ) {
    return this.pageService.update(params.id, request);
  }

  @Delete(':id')
  @ApiDeletePage()
  async delete(@Param() params: IdParamDto) {
    await this.pageService.delete(params.id);
  }
}
