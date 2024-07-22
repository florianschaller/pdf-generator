/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { BasicAuthGuard } from './guards/basic-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const globalPrefix = configService.get('globalPrefix');
  const port = configService.get('port');

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalGuards(new BasicAuthGuard(configService));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
