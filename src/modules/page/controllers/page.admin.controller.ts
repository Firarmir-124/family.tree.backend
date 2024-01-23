import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseGuards,
} from '@nestjs/common';
import { CreatePageRequestDto } from '../dtos/create-request.dto';
import { UpdatePageRequestDto } from '../dtos/update-request.dto';
import { IdParamDto } from '../../../global/dtos/id-param.dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller({
  version: '1',
  path: 'page',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.page')
@ApiBearerAuth('access-token')
export class PageAdminController {
  constructor() {}

  @Post()
  async create(@Body() request: CreatePageRequestDto) {
    return 'create page';
  }

  @Patch(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() request: UpdatePageRequestDto,
  ) {
    return 'update page';
  }

  @Delete(':id')
  async delete(@Param() params: IdParamDto) {
    return 'delete page';
  }

  @Get()
  async findAll() {
    return 'find all page';
  }
}
