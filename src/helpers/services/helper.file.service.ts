import { BadRequestException, Injectable } from '@nestjs/common';
import bytes from 'bytes';
import { ENUM_HELPER_FILE_TYPE } from '../constants/helper.enum.constant';
import { IHelperFileService } from '../interfaces/helper.file-service.interface';
import {
  IHelperFileCreateExcelWorkbookOptions,
  IHelperFileReadExcelOptions,
  IHelperFileRows,
  IHelperFileWriteExcelOptions,
} from '../interfaces/helper.interface';
import { read, utils, WorkBook, write } from 'xlsx';
import { readFileSync, writeFileSync } from 'fs';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class HelperFileService implements IHelperFileService {
  storageMulter(destination: string): MulterOptions {
    return {
      storage: diskStorage({
        destination,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }

        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
      },
    };
  }

  createExcelWorkbook(
    rows: IHelperFileRows[],
    options?: IHelperFileCreateExcelWorkbookOptions,
  ): WorkBook {
    // headers
    const headers = Object.keys(rows[0]);

    // worksheet
    const worksheet = utils.json_to_sheet(rows);

    // workbook
    const workbook = utils.book_new();

    utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    utils.book_append_sheet(
      workbook,
      worksheet,
      options?.sheetName ?? 'Sheet 1',
    );

    return workbook;
  }

  writeExcelToBuffer(
    workbook: WorkBook,
    options?: IHelperFileWriteExcelOptions,
  ): Buffer {
    // create buffer
    const buff: Buffer = write(workbook, {
      type: 'buffer',
      bookType: options?.type ?? ENUM_HELPER_FILE_TYPE.CSV,
      password: options?.password,
    });

    return buff;
  }

  readExcelFromBuffer(
    file: Buffer,
    options?: IHelperFileReadExcelOptions,
  ): IHelperFileRows[][] {
    // workbook
    const workbook = read(file, {
      type: 'buffer',
      password: options?.password,
      sheets: options?.sheet,
    });

    // worksheet
    const worksheetsName: string[] = workbook.SheetNames;
    const sheets: IHelperFileRows[][] = [];
    for (const worksheetName of worksheetsName) {
      const worksheet = workbook.Sheets[worksheetName];

      // rows
      const rows: IHelperFileRows[] = utils.sheet_to_json(worksheet);
      sheets.push(rows);
    }

    return sheets;
  }

  convertToBytes(megabytes: string): number {
    return bytes(megabytes);
  }

  createJson(path: string, data: Record<string, any>[]): boolean {
    const sData = JSON.stringify(data);
    writeFileSync(path, sData);

    return true;
  }

  readJson(path: string): Record<string, any>[] {
    const data: string = readFileSync(path, 'utf8');
    return JSON.parse(data);
  }
}
