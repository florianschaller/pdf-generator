import { Body, Controller, Post } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { PDFDocumentDataForm } from '../dtos';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private pdfGeneratorService: PdfGeneratorService) {}

  @Post('/generate')
  async generatePdf(@Body() pdfDocumentDataForm: PDFDocumentDataForm) {
    return this.pdfGeneratorService.generatePdf(pdfDocumentDataForm);
  }
}
