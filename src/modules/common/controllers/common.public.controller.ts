import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
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

@Controller('')
@ApiTags('public.common')
export class CommonPublicController {
  constructor(private readonly commonService: CommonService) {}

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
