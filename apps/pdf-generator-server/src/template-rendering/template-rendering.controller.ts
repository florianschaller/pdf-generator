import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PDFDocumentDataForm } from '../dtos';
import { TemplateRenderingService } from './template-rendering.service';
import { isWithTemplate } from '@stemys/pdf-generator/constants';
import axios from 'axios';

@Controller('template-rendering')
export class TemplateRenderingController {
  constructor(private templateRenderingService: TemplateRenderingService) {}

  @Post('/')
  async compileTemplate(
    @Body() pdfDocumentData: PDFDocumentDataForm,
    @Res() res: Response
  ) {
    let template: string;

    if (isWithTemplate(pdfDocumentData)) {
      template = pdfDocumentData.template!;
    } else {
      const templateUrl = pdfDocumentData.templateUrl!;
      try {
        template = await axios.get(templateUrl);
      } catch (error) {
        throw new Error(`Failed to fetch template from ${templateUrl}`);
      }
    }

    res
      .status(HttpStatus.OK)
      .send(
        this.templateRenderingService.compileTemplate(
          template,
          pdfDocumentData.data
        )
      );
  }
}
