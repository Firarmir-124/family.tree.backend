import { Controller } from '@nestjs/common';
import { SlugParamDto } from '../../../global/dtos/slug-param.dto';

@Controller({
  version: '1',
  path: 'page',
})
export class PagePublicController {
  constructor() {}

  @Get(':slug')
  async findOne(@Param() params: SlugParamDto) {
    return 'find one page';
  }
}
