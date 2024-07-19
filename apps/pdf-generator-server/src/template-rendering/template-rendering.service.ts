import { Injectable } from '@nestjs/common';
import Handlebars from "handlebars";

@Injectable()
export class TemplateRenderingService {
  generateHtml(template: string, data: object): string {
    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate(data);
    return html;
  }
}
