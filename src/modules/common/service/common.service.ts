import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { ROOT } from '../../../main';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from '../entities/file.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FilesEntity)
    private readonly fileRepository: Repository<FilesEntity>,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const folder = this.configService.get('IMAGE_FOLDER');
    // generate base64 with 28 symbols
    const name =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const filename =
      path.join(folder, name[0] + name[1], name[2] + name[3], name) +
      path.extname(file.originalname);
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

    const newFileName = '/' + filename.replaceAll('\\', '/');

    return await this.fileRepository.save({
      type: file.mimetype,
      name: file.fieldname,
      path: newFileName,
    });
  }

  async uploadFiles(files: Express.Multer.File[], id: number) {
    console.log(files);

    const uploadsFile: {
      type: string;
      name: string;
      path: string;
      proposal: number;
    }[] = [];

    const folder = this.configService.get('IMAGE_FOLDER');
    await fs.promises.mkdir(folder, { recursive: true });

    const newPatchImages = path.join(
      folder,
      this.configService.get('IMAGE_FOLDER_IMAGE'),
    );
    const newPatchApplication = path.join(
      folder,
      this.configService.get('IMAGE_FOLDER_APPLICATION'),
    );

    await fs.promises.mkdir(newPatchImages, { recursive: true });
    await fs.promises.mkdir(newPatchApplication, { recursive: true });

    for (const file of files) {
      const name =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const newFilename = name + path.extname(file.originalname);

      let newFilePath = '';

      if (file.mimetype.split('/')[0] === 'image') {
        newFilePath = path.join(newPatchImages, newFilename);
      } else {
        newFilePath = path.join(newPatchApplication, newFilename);
      }

      await fs.promises.rename(file.path, newFilePath);

      uploadsFile.push({
        type: file.mimetype,
        name: file.fieldname,
        path: '/' + newFilePath.replaceAll('\\', '/'),
        proposal: id,
      });
    }

    await this.fileRepository.save(uploadsFile);
  }

  async removeFile(filename: string[]) {
    let state = true;

    filename.forEach((item) => {
      const file = path.join(ROOT, '..', item);

      if (file.includes(path.join(ROOT, '..', 'images'))) {
        if (!fs.existsSync(file)) {
          state = true;
        }
        try {
          fs.unlinkSync(file);
          state = true;
        } catch (e) {
          console.log('e', e);
        }
        state = false;
      }
      state = false;
    });

    await this.fileRepository.delete({ path: In(filename) });

    return state;
  }
}
