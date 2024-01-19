import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DictionaryService } from "../services/dictionary.service";
import { DictionaryType } from "../interfaces/dictionary-type.interface";

@Controller({
  version: '1',
  path: 'dictionary'
})
@ApiTags('public.dictionary')
export class DictionaryPublicController {
  constructor(
    private readonly dictionaryService: DictionaryService,
  ) {
  }
  @Get('distinct')
  async distinct() {
    return await this.dictionaryService.findAll(DictionaryType.DISTRICT);
  }
  @Get('estates')
  async estates() {
    return this.dictionaryService.findAll(DictionaryType.ESTATE_TYPE);
  }
  @Get('tags')
  async tags() {
    return this.dictionaryService.findAll(DictionaryType.TAGS);
  }
  @Get('vacancies')
  async vacancies() {
    return this.dictionaryService.findAll(DictionaryType.VACANCIES);
  }
  @Get('info')
  async info() {
    return this.dictionaryService.findAll(DictionaryType.INFO);
  }
  @Get('certs')
  async certs() {
    return this.dictionaryService.findAll(DictionaryType.CERTS);
  }
}