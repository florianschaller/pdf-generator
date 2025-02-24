import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';

@Injectable()
export class TemplateRenderingService {
  compileTemplate(template: string, data: object): string {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
  }
}
