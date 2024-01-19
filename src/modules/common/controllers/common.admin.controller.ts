import { Body, Controller, Delete, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import * as fs from "fs";
import * as path from "path";
import { ConfigService } from "@nestjs/config";
import { FastifyFileInterceptor } from "../decorators/fastify.decorator";
import { diskStorage } from "multer";
import { ROOT } from "../../../main";

@Controller('')
@ApiTags('admin.common')
export class CommonAdminController {

  constructor(
    private readonly configService: ConfigService,
  ) {
  }
  @Post('upload/file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: 'object',
  })
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    })
  )
  async uploadFile(@UploadedFile() file) {
    const folder = this.configService.get('IMAGE_FOLDER');
    // generate base64 with 28 symbols
    const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const filename = path.join(folder, name[0] + name[1], name[2] + name[3], name) + path.extname(file.originalname);
    console.log('file', file, filename);
    // fs.writeFileSync(filename, file.buffer);
    fs.readFile(file.path, (err, data) => {
      if (err) throw err;
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log('File copied successfully');
      });
    });
    return {
      filename: '/' + filename.replaceAll('\\', '/'),
    };
  }

  @Post('delete/file')
  async removeFile(@Body('filename') filename: string) {
    const file = path.join(ROOT, '..', filename);
    console.log('ds', file, path.join(ROOT, 'images'), file.includes(path.join(ROOT, 'images')), fs.existsSync(file));
    if (file.includes(path.join(ROOT, '..', 'images'))) {
      if (!fs.existsSync(file)) {
        return true;
      }
      try {
        fs.unlinkSync(file);
        return true;
      } catch (e) {
        console.log('e', e);
      }
      return false;
    }
    return false;
  }
}