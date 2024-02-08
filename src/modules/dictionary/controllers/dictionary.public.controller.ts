import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    description: 'положительный ответ',
    status: HttpStatus.OK,
    type: [DictionaryEntity],
  })
  async distinct() {
    return await this.dictionaryService.findAll(DictionaryType.DISTRICT);
  }
}
