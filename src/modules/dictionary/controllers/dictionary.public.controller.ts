import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DictionaryService } from '../services/dictionary.service';
import { DictionaryType } from '../interfaces/dictionary-type.interface';
import { DictionaryEntity } from '../entities/dictionary.entity';

@Controller({
  version: '1',
  path: 'dictionary',
})
@ApiTags('public.dictionary')
export class DictionaryPublicController {
  constructor(private readonly dictionaryService: DictionaryService) {}
  @Get('distinct')
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiResponse({
    description: 'положительный ответ',
    status: HttpStatus.OK,
    type: [DictionaryEntity],
  })
  @ApiOperation({ summary: 'findAll distinct' })
  async distinct(@Param('type') type: DictionaryType) {
    return this.dictionaryService.findAll(type);
  }
}
