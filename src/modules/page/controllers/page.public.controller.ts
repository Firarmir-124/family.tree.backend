import { Controller, Get, Param } from '@nestjs/common';
import { SlugParamDto } from '../../../global/dtos/slug-param.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'page',
})
@ApiTags('public.page')
export class PagePublicController {
  constructor() {}

  @Get(':slug')
  async findOne(@Param() params: SlugParamDto) {
    return 'find one page';
  }
}
