import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import fastifyCsrf from '@fastify/csrf-protection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multipart from '@fastify/multipart';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

export const ROOT = __dirname;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/tree.wiskg.tech/privkey.pem'),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/tree.wiskg.tech/fullchain.pem',
    ),
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: httpsOptions }),
  );
  const logger = new Logger('bootstrap');
  app.enableCors();
  const configService = app.get(ConfigService);
  await app.register(fastifyCsrf);
  await app.register(multipart);
  // public assets
  app.useStaticAssets({
    root: __dirname + '/../images',
    prefix: '/images/',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('ЕСКМП Api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  logger.log(`starting in port: ${configService.get('PORT', 3000)}`);

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
