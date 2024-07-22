import axios, { AxiosError } from 'axios';
import { PDFDocumentData } from '@stemys/pdf-generator/constants';
import * as path from 'path';
import { outputFileSync, readFileSync } from 'fs-extra';
import * as invoiceData from '../assets/templates/invoice.hbs.json';

describe('POST /api/pdf-generator/generate', () => {
  const distFolderPath = path.resolve(
    __dirname,
    '../../../../dist/apps/pdf-generator-server-e2e'
  );
  const templatesFolderPath = path.resolve(__dirname, '../assets/templates');
  const invoiceTemplate = readFileSync(
    path.join(templatesFolderPath, 'invoice.hbs'),
    'utf-8'
  );

  it('generate a PDF with the data passed in the request body', async () => {
    const data: PDFDocumentData = {
      template: invoiceTemplate,
      data: invoiceData,
      metadata: {
        title: 'Test title',
        subject: 'Test subject',
        author: 'This is the author',
        producer: 'This is the producer',
        creator: 'This is the creator',
      },
    };
    try {
      const res = await axios.post(`/api/pdf-generator/generate`, data);
      outputFile('invoice.pdf', res.data.data);
      expect(res.status).toBe(201);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(`Request failed with status ${error.response?.status}: ${error.response?.data}`);
      } else {
        throw new Error(`An unexpected error occurred : ${error.message}`);
      }
    }
  });

  const outputFile = (fileName: string, file: ArrayBuffer) => {
    const outputPath = path.join(distFolderPath, fileName);
    const buffer = Buffer.from(file);
    try {
      outputFileSync(outputPath, buffer);
      console.log(`File saved at ${outputPath}`);
    } catch {
      throw new Error(`Failed to save the file at ${outputPath}`);
    }
  };
});
