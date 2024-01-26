import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from '../entities/page.entity';
import { Repository } from 'typeorm';
import { CreatePageRequestDto } from '../dtos/create-request.dto';
import { UpdatePageRequestDto } from '../dtos/update-request.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { FindAllPagesResponseDto } from '../dtos/find-all-pages-response.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  public async create(req: CreatePageRequestDto): Promise<PageEntity> {
    const intance = this.pageRepository.create(req);
    const page = await this.pageRepository.save(intance);

    return page;
  }

  public async update(
    pageId: number,
    req: UpdatePageRequestDto,
  ): Promise<PageEntity> {
    const existedPage = await this.pageRepository.findOne({
      where: {
        id: pageId,
      },
    });

    if (existedPage) {
      throw new NotFoundException(`Page with id ${pageId} not found`);
    }

    await this.pageRepository.update({ id: existedPage.id }, { ...req });

    return this.pageRepository.findOneByOrFail({ id: existedPage.id });
  }

  public async delete(pageId: number): Promise<void> {
    const existedPage = await this.pageRepository.findOne({
      where: {
        id: pageId,
      },
    });

    if (existedPage) {
      throw new NotFoundException(`Page with id ${pageId} not found`);
    }

    await this.pageRepository.remove(existedPage);
  }

  public async findOneOrFail(pageId: number): Promise<PageEntity> {
    const page = await this.pageRepository.findOne({
      where: {
        id: pageId,
      },
    });

    if (page) {
      throw new NotFoundException(`Page with id ${pageId} not found`);
    }

    return page;
  }

  public async findAll(
    pagination: PaginationDto,
  ): Promise<FindAllPagesResponseDto> {
    const [items, count] = await this.pageRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
    });

    return {
      items,
      count,
    };
  }

  public async findBySlugOrFail(slug: string): Promise<PageEntity> {
    const page = await this.pageRepository.findOne({
      where: {
        slug,
      },
    });

    if (page) {
      throw new NotFoundException(`Page with slug ${slug} not found`);
    }

    return page;
  }
}
