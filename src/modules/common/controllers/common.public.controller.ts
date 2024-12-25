import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from '../service/common.service';
import { FastifyFilesInterceptor } from '../decorators/fastifys.decorator';
import { FastifyFileInterceptor } from '../decorators/fastify.decorator';
import { CreateGeneralDataDto } from '../dto/create-general-data.dto';
import { DeleteResult } from 'mongoose';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { ROOT } from '../../../main';

@Controller('')
@ApiTags('public.common')
export class CommonPublicController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/:path')
  public async getFileByPath(
    @Param('path') path2: string,
    @Res() res: Response,
  ): Promise<any> {
    const filePath = path.join(ROOT, '..', path2);

    const fileContent = await fs.promises.readFile(filePath);
    res.setHeader('Content-Disposition', 'attachment');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileContent);
  }

  @Post('upload/files')
  @UseInterceptors(FastifyFilesInterceptor('file', 10))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.commonService.uploadFiles(files);
  }

  @Post('delete/file')
  async removeFile(
    @Body('filename') filename: string[],
  ): Promise<DeleteResult> {
    return this.commonService.removeFile(filename);
  }

  @Put('update/file')
  @UseInterceptors(FastifyFileInterceptor('file'))
  async updateFile(
    @Body('filename') filename: string | null,
    @UploadedFile() file: Express.Multer.File | null,
  ) {
    return this.commonService.updateFile(filename, file);
  }

  @Get('general-data')
  async getGeneralData(@Query('file') file: string | null) {
    return this.commonService.getGeneralData(file);
  }

  @Post('general-data')
  async createGeneralData(
    @Body('generalData') generalData: CreateGeneralDataDto,
  ) {
    return this.commonService.createGeneralData(generalData);
  }

  @Delete('general-data/delete/:id')
  async deleteGeneralData(@Param('id') id: string): Promise<DeleteResult> {
    return this.commonService.deleteGeneralData(id);
  }

  @Put('general-data/update/:id')
  async updateGeneralData(
    @Param('id') id: string,
    @Body('generalData') generalData: CreateGeneralDataDto,
  ) {
    return this.commonService.updateGeneralData(id, generalData);
  }
}
