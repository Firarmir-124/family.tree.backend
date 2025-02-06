import {
  Body,
  Controller, Get,
  Param,
  Patch,
  Post,
  Put, Res,
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
import { FastifyReply } from 'fastify';

@Controller('')
@ApiTags('public.common')
export class CommonPublicController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/:path')
  public async getAttachmentByPath(
    @Param('path') path: string,
    @Res() res: FastifyReply,
  ): Promise<any> {
    const fileContent = await fs.promises.readFile(path);
    console.log('fileContent', fileContent);

    res.header('Content-Disposition', 'attachment');
    res.header('Content-Type', 'application/octet-stream');
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
    console.log('test');
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

  @Patch('general-data/update/:id')
  async updateGeneralData(
    @Param('id') id: string,
    @Body('generalData') generalData: string,
  ) {
    return this.commonService.updateGeneralData(id, generalData);
  }
}
