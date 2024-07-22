import { Module } from '@nestjs/common';
import { TemplateRenderingService } from './template-rendering.service';

@Module({
  providers: [TemplateRenderingService],
  exports: [TemplateRenderingService],
})
export class TemplateRenderingModule {}
