import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { DEFAULT_PDF_FONT, renderPdfDocument, setPdfMetadata } from './helpers';

import {
  isWithTemplate,
  PDFDocumentData,
} from '@stemys/pdf-generator/constants';
import { TemplateRenderingService } from '../template-rendering/template-rendering.service';
import axios from 'axios';

@Injectable()
export class PdfGeneratorService {
  private readonly logger = new Logger(PdfGeneratorService.name);

  constructor(private templateRenderingService: TemplateRenderingService) {}

  async generatePdf(data: PDFDocumentData) {
    const browser = await puppeteer.launch({
      /**
       * Adding `--no-sandbox` here is for easier deployment. Please see puppeteer docs about
       * this argument and why you may not want to use it.
       */
      args: [`--no-sandbox`],
    });

    const pdfData = {
      ...data,
      font: data.font ?? DEFAULT_PDF_FONT,
    } as PDFDocumentData;

    let template: string;

    if (isWithTemplate(pdfData)) {
      template = pdfData.template!;
    } else {
      const templateUrl = pdfData.templateUrl!;
      try {
        template = await axios.get(templateUrl);
      } catch (error) {
        throw new Error(`Failed to fetch template from ${templateUrl}`);
      }
    }

    const documentBody = this.templateRenderingService.compileTemplate(
      template,
      pdfData.data
    );
    const content = renderPdfDocument(pdfData, documentBody);
    const pdfOptions = pdfData?.options || {};

    const page = await browser.newPage();

    page.on('console', (msg) => this.logger.debug(msg.text()));

    await page.setContent(content, {
      waitUntil: 'domcontentloaded',
    });
    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: !!pdfData.headerTemplate || !!pdfData.footerTemplate,
      headerTemplate: pdfData.headerTemplate || '<div></div>',
      footerTemplate: pdfData.footerTemplate || '<div></div>',
      ...pdfOptions,
      margin: {
        left: '40px',
        right: '40px',
        top: '40px',
        bottom: '40px',
        ...(pdfOptions?.margin || {}),
      },
    });

    const result = await setPdfMetadata(pdf, pdfData?.metadata);

    await browser.close();

    return result;
  }
}
