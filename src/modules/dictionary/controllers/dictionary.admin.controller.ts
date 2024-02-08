import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DictionaryService } from '../services/dictionary.service';
import { DictionaryType } from '../interfaces/dictionary-type.interface';
import { AuthGuard } from '@nestjs/passport';
import { DictionaryEntity } from '../entities/dictionary.entity';
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
  @ApiOperation({ summary: 'Create dictionary' })
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiBody({ schema: { example: { key: 'key', description: 'description' } } })
  @ApiResponse({
    type: DictionaryEntity,
    status: HttpStatus.CREATED,
    description: 'положительный ответ',
  })
  create(
    @Param('type') type: DictionaryType,
    @Body('key') key: string,
    @Body('description') description: string,
  ) {
    console.log('type', type, key, description);
    return this.dictionaryService.create(type, key, description);
  }

  @Get()
  @ApiOperation({ summary: 'findAll dictionary' })
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiResponse({
    type: [DictionaryEntity],
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  findAll(
    @Param('type') type: DictionaryType,
    @Pagination() pagination?: PaginationDto,
  ) {
    // TODO: pagination
    return this.dictionaryService.findAll(type, pagination);
  }

  @Get('total')
  @ApiOperation({ summary: 'find total dictionary' })
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  getTotal(@Param('type') type: DictionaryType) {
    return this.dictionaryService.getTotal(type);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update dictionary' })
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ schema: { example: { key: 'key', description: 'description' } } })
  @ApiResponse({
    type: DictionaryEntity,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  update(
    @Param('type') type: DictionaryType,
    @Param('id') id: number,
    @Body('key') key: string,
    @Body('value') value: string,
  ) {
    return this.dictionaryService.update(id, key, value);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove dictionary' })
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  remove(@Param('type') type: DictionaryType, @Param('id') id: number) {
    return this.dictionaryService.remove(id);
  }
}
