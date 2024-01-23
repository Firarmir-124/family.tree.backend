import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {MaterialService} from "../services/material.service";

@Controller({
  version: '1',
  path: 'material'
})
@ApiTags('public.material')
export class MaterialPublicController {
  constructor(
    private readonly materialService: MaterialService,
  ) {
  }
  @Get('')
  async findAll() {
    return this.materialService.getGroups();
  }
}
