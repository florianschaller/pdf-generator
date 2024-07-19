import { Module } from '@nestjs/common';

import { PdfGeneratorModule } from '../pdf-generator/pdf-generator.module';

@Module({
  imports: [PdfGeneratorModule],
})
export class AppModule {}
