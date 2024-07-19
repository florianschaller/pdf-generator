import { PDFOptions } from 'puppeteer';

export interface PDFMetadata {
  title: string;
  subject: string;
  author: string;
  producer: string;
  creator: string;
}

export interface Font {
  familyDisplay: string;
  family: string;
  fontFaces?: {
    style?: string;
    weight?: number;
    format?: string;
    src: string;
  }[];
}

export interface PDFDocumentData {
  data: any;
  template?: string;
  templateUrl?: string;
  metadata: PDFMetadata;
  options?: PDFOptions;
  font?: Font;
}

export const isWithTemplate = (data: PDFDocumentData) => {
  return data.template !== undefined;
}

export const isWithTemplateUrl = (data: PDFDocumentData) => {
  return data.templateUrl !== undefined;
}
