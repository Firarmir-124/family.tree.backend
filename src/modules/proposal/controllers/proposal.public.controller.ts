import { Body, Controller, Get, Injectable, Param, Post, Query } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ProposalService } from "../services/proposal.service";

@Controller({
  version: '1',
  path: 'proposal',
})
@ApiTags('public.proposal')
export class ProposalPublicController {

  constructor(
    private readonly proposalService: ProposalService,
  ) {
  }

  @Post('')
  async create(
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('description') description: string
  ) {
    return await this.proposalService.create({ name, phone, description });
  }
}
