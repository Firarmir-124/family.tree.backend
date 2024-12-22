import { Module } from '@nestjs/common';
import { CommonPublicController } from '../../modules/common/controllers/common.public.controller';
import { CommonModule } from '../../modules/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonPublicController],
  providers: [],
})
export class RoutePublicModule {}
