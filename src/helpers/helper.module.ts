import { Global, Module } from '@nestjs/common';
import { HelperHashService } from './services/helper.hash.service';
import { HelperDateService } from './services/helper.date.service';
import { HelperArrayService } from './services/helper.array.service';
import { HelperEncryptionService } from './services/helper.encryption.service';
import { HelperFileService } from './services/helper.file.service';
import { HelperNumberService } from './services/helper.number.service';
import { HelperStringService } from './services/helper.string.service';

@Global()
@Module({
  providers: [
    HelperArrayService,
    HelperDateService,
    HelperEncryptionService,
    HelperFileService,
    HelperHashService,
    HelperNumberService,
    HelperStringService,
  ],
  exports: [
    HelperArrayService,
    HelperDateService,
    HelperEncryptionService,
    HelperFileService,
    HelperHashService,
    HelperNumberService,
    HelperStringService,
  ],
})
export class HelperModule {}
