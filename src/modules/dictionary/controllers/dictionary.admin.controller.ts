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
  findAll(
    @Param('type') type: DictionaryType,
  ) {
    // TODO: pagination
    return this.dictionaryService.findAll(type);
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
    @Param('id') id: number,
    @Body('key') key: string,
    @Body('value') value: string,
  ) {
    return this.dictionaryService.update(id, key, value);
  }

  @Delete(':id')
  @ApiParam({ name: 'type', enum: DictionaryType })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('type') type: DictionaryType, @Param('id') id: number) {
    return this.dictionaryService.remove(id);
  }
}
