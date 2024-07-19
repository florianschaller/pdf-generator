import { Module } from '@nestjs/common';
import { PdfGeneratorController } from './pdf-generator.controller';
import { PdfGeneratorService } from './pdf-generator.service';
import { TemplateRenderingModule } from '../template-rendering/template-rendering.module';

@Module({
  imports: [TemplateRenderingModule],
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService],
})
export class PdfGeneratorModule {}
