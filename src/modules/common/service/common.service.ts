import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { ROOT } from '../../../main';
import { In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateGeneralDataDto } from '../dto/create-general-data.dto';
import {
  GeneralDates,
  GeneralDatesEntity,
} from '../entities/generalData.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { FileEntity, Files } from '../entities/file.entity';

@Injectable()
export class CommonService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(FileEntity.name)
    private readonly fileRepository: Model<Files>,
    @InjectModel(GeneralDatesEntity.name)
    private readonly generalDateRepository: Model<GeneralDates>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const uploadsFile: {
      type: string;
      name: string;
      path: string;
      [id: string]: number | string;
    }[] = [];

    const folder = this.configService.get('IMAGE_FOLDER');
    try {
      // Создаем директорию, если ее нет
      await fs.promises.mkdir(folder, { recursive: true });

      for (const file of files) {
        const name = uuidv4();
        const newFilename = name + path.extname(file.originalname);

        const newFilePath = path.join(folder, name, newFilename);

        // Чтение файла и запись в новое место
        const data = await fs.promises.readFile(file.path);
        await fs.promises.mkdir(path.dirname(newFilePath), { recursive: true });
        await fs.promises.writeFile(newFilePath, data);
        console.log('File copied successfully');

        // Добавление информации о файле в массив для базы данных
        uploadsFile.push({
          type: file.mimetype,
          name: file.fieldname,
          path: '/' + newFilePath.replaceAll('\\', '/'), // Путь с прямыми слэшами
        });
      }

      // Сохраняем информацию о файлах в базе данных
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
        file.includes(path.join(ROOT, '..', 'files')) &&
        fs.existsSync(file)
      ) {
        try {
          fs.unlinkSync(file);
          fs.rmdirSync(path.dirname(file));
        } catch (e) {
          console.log('e', e);
        }
      }
    });

    return this.fileRepository.deleteMany({ path: In(filename) });
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

  async getGeneralData(file: string | null) {
    const where = {};

    if (file) {
      where['file'] = {
        id: parseInt(file),
      };
    }

    console.log('where', where);

    return await this.generalDateRepository.find({
      where,
      relations: ['file'],
    });
  }

  async createGeneralData(generalData: CreateGeneralDataDto) {
    const fileOne = await this.fileRepository.findOne({
      where: { id: generalData.fileId },
    });

    if (!fileOne) {
      throw new NotFoundException();
    }

    return this.generalDateRepository.create({ ...generalData, file: fileOne });
  }

  async deleteGeneralData(id: string): Promise<DeleteResult> {
    const fileOne = await this.generalDateRepository.findOne({
      where: { id },
    });

    if (!fileOne) {
      throw new NotFoundException();
    }

    return this.generalDateRepository.deleteOne({ id });
  }

  async updateGeneralData(id: string, generalData: CreateGeneralDataDto) {
    const generalDataOne = await this.generalDateRepository.findOne({
      where: { id },
    });

    const fileOne = await this.fileRepository.findOne({
      where: { id: generalData.fileId },
    });

    if (!generalDataOne) {
      throw new NotFoundException();
    }

    return this.generalDateRepository.updateOne(
      { id },
      {
        ...generalData,
        file: fileOne,
      },
    );
  }
}
