import { Global, Module } from '@nestjs/common';
import { HelperDateService } from './services/helper.date.service';
import { HelperArrayService } from './services/helper.array.service';
import { HelperFileService } from './services/helper.file.service';
import { HelperNumberService } from './services/helper.number.service';
import { HelperStringService } from './services/helper.string.service';

@Global()
@Module({
  providers: [
    HelperArrayService,
    HelperDateService,
    HelperFileService,
    HelperNumberService,
    HelperStringService,
  ],
  exports: [
    HelperArrayService,
    HelperDateService,
    HelperFileService,
    HelperNumberService,
    HelperStringService,
  ],
})
export class HelperModule {}
