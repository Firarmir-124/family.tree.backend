import { Controller, Get, Param } from '@nestjs/common';
import { SlugParamDto } from '../../../global/dtos/slug-param.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiFindOneBySlugPage } from '../decorators/find-one-by-slug.decorator';
import { PageService } from '../services/page.service';
import { ApiFindOnePage } from '../decorators/find-one-page.decorator';
import { PageEntity } from '../entities/page.entity';
import { IdParamDto } from '../../../global/dtos/id-param.dto';
import { ApiFindAllPages } from '../decorators/find-all-pages.decorator';
import { FindAllPagesResponseDto } from '../dtos/find-all-pages-response.dto';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';

@Controller({
  version: '1',
  path: 'page',
})
@ApiTags('public.page')
export class PagePublicController {
  constructor(private readonly pageService: PageService) {}

  @Get('slug/:slug')
  @ApiFindOneBySlugPage()
  async findOneBySlug(@Param() params: SlugParamDto) {
    return this.pageService.findBySlugOrFail(params.slug);
  }

  @Get(':id')
  @ApiFindOnePage()
  async findOne(@Param() params: IdParamDto): Promise<PageEntity> {
    return this.pageService.findOneOrFail(params.id);
  }

  @Get()
  @ApiFindAllPages()
  async findAll(
    @Pagination() pagination: PaginationDto,
  ): Promise<FindAllPagesResponseDto> {
    return this.pageService.findAll(pagination);
  }
}
