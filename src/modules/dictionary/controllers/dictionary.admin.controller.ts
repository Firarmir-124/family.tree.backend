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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DictionaryService } from '../services/dictionary.service';
import { DictionaryType } from '../interfaces/dictionary-type.interface';
import { AuthGuard } from '@nestjs/passport';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';

@Controller({
  version: '1',
  path: 'dictionary/:type',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.dictionary')
@ApiBearerAuth('access-token')
export class DictionaryAdminController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiBody({ schema: { example: { key: 'key', description: 'description' } } })
  create(
    @Param('type') type: DictionaryType,
    @Body('key') key: string,
    @Body('description') description: string,
  ) {
    console.log('type', type, key, description);
    return this.dictionaryService.create(type, key, description);
  }

  @Get()
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiBody({ type: PaginationDto })
  findAll(
    @Param('type') type: DictionaryType,
    @Pagination() pagination: PaginationDto,
  ) {
    return this.dictionaryService.findAll(type, {
      skip: (pagination.page - 1) * pagination.perPage,
      limit: pagination.perPage,
    });
  }

  @Get('total')
  @ApiParam({ name: 'type', enum: DictionaryType })
  getTotal(@Param('type') type: DictionaryType) {
    return this.dictionaryService.getTotal(type);
  }

  @Patch(':id')
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ schema: { example: { key: 'key', description: 'description' } } })
  update(
    @Param('type') type: DictionaryType,
    @Param('id') id: string,
    @Body('key') key: string,
    @Body('description') description: string,
  ) {
    return this.dictionaryService.update(id, key, description);
  }

  @Delete(':id')
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('type') type: DictionaryType, @Param('id') id: string) {
    return this.dictionaryService.remove(id);
  }
}
