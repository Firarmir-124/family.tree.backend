import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { ROOT } from '../../../main';
import { In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateGeneralDataDto } from '../dto/create-general-data.dto';

import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { FileEntity, Files } from '../entities/file.entity';

@Injectable()
export class CommonService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(FileEntity.name)
    private readonly fileRepository: Model<Files>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const uploadsFile: {
      type: string;
      name: string;
      path: string;
      title: string | null;
      description: string | null;
    }[] = [];

    const folder = this.configService.get('IMAGE_FOLDER');

    try {
      for (const file of files) {
        const name =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        const filename =
          path.join(folder, name[0] + name[1], name[2] + name[3], name) +
          path.extname(file.originalname);

        // Чтение файла и запись в новое место
        const data = await fs.promises.readFile(file.path);
        await fs.promises.mkdir(path.dirname(filename), { recursive: true });
        await fs.promises.writeFile(filename, data);
        console.log('File copied successfully');

        uploadsFile.push({
          type: file.mimetype,
          name: file.fieldname,
          path: '/' + filename.replaceAll('\\', '/'),
          title: null,
          description: null,
        });
      }

      return await this.fileRepository.create(uploadsFile);
    } catch (error) {
      console.error('Error while uploading files:', error);
      throw new Error('File upload failed');
    }
  }

  async removeFile(filename: string[]): Promise<DeleteResult> {
    if (filename.length === 0) {
      throw new NotFoundException();
    }

    filename.forEach((item) => {
      const file = path.join(ROOT, '..', item);

      if (
        file.includes(path.join(ROOT, '..', 'images')) &&
        fs.existsSync(file)
      ) {
        console.log('file', file);
        try {
          fs.unlinkSync(file);
          fs.rmdirSync(path.dirname(file));
        } catch (e) {
          console.log('e', e);
        }
      }
    });

    return this.fileRepository.deleteMany({ path: { $in: filename } });
  }

  async updateFile(filename: string | null, file: Express.Multer.File | null) {
    if (!file || !filename) {
      throw new NotFoundException(`filename and file not found`);
    }

    const filePatch = path.join(ROOT, '..', filename);

    if (!filePatch.includes(path.join(ROOT, '..', 'files'))) {
      throw new NotFoundException(`Folder not found`);
    }

    if (!fs.existsSync(filePatch)) {
      throw new NotFoundException(`File 1 ${file} not found`);
    }

    const folder = this.configService.get('IMAGE_FOLDER');
    const name = uuidv4();
    const newFilename = name + path.extname(file.originalname);

    const newFilePath = path.join(`${folder}/${name}`, newFilename);

    const data = await fs.promises.readFile(file.path);
    await fs.promises.mkdir(path.dirname(newFilePath), { recursive: true });
    await fs.promises.writeFile(newFilePath, data);
    await this.fileRepository.updateOne(
      { path: filename },
      {
        type: file.mimetype,
        name: file.fieldname,
        path: '/' + newFilePath.replaceAll('\\', '/'),
      },
    );
    fs.unlinkSync(filePatch);
    fs.rmdirSync(path.dirname(filePatch));
    return true;
  }

  async updateGeneralData(id: string, generalData: string) {
    return this.fileRepository.updateOne(
      { _id: id },
      {
        $set: { description: generalData },
      },
    );
  }
}
