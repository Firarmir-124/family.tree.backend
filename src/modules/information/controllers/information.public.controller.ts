import { Controller, Get } from '@nestjs/common';
import { InformationService } from '../services/information.service';

@Controller({})
export class InformationPublicController {
  constructor(private readonly informationService: InformationService) {}
  @Get('info')
  async info() {
    return this.informationService.findAll();
  }
}
