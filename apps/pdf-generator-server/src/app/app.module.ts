import { Module } from '@nestjs/common';

import { PdfGeneratorModule } from '../pdf-generator/pdf-generator.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { validate } from '../config/env.validation';

@Module({
  imports: [
    PdfGeneratorModule,
    ConfigModule.forRoot({
      validate,
      load: [configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
