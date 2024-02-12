import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FastifyFileInterceptor } from '../decorators/fastify.decorator';
import { CommonService } from '../service/common.service';
import { FastifyFilesInterceptor } from '../decorators/fastifys.decorator';
import { UploadFileType } from '../types';

@Controller('')
@ApiTags('admin.common')
export class CommonAdminController {
  constructor(private readonly commonService: CommonService) {}
  @Post('upload/file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: 'object',
  })
  @UseInterceptors(FastifyFileInterceptor('file', './uploads'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.commonService.uploadFile(file);
  }

  @Post('upload/files')
  @UseInterceptors(FastifyFilesInterceptor('file', 10, './uploads'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    field: UploadFileType,
  ) {
    return this.commonService.uploadFiles(files, field);
  }

  @Post('delete/file')
  async removeFile(@Body('filename') filename: string[]) {
    return this.commonService.removeFile(filename);
  }
}
