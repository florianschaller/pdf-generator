import { Module } from '@nestjs/common';
import { TemplateRenderingService } from './template-rendering.service';
import { TemplateRenderingController } from './template-rendering.controller';

@Module({
  providers: [TemplateRenderingService],
  controllers: [TemplateRenderingController],
  exports: [TemplateRenderingService],
})
export class TemplateRenderingModule {}
