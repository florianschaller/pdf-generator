import axios, { AxiosError } from 'axios';
import { PDFDocumentData } from '@stemys/pdf-generator/constants';
import * as path from 'path';
import { readFileSync } from 'fs-extra';
import * as invoiceData from './assets/templates/invoice.hbs.json';
import { getHeaders, outputFile } from './utils';

describe('POST /api/pdf-generator/generate', () => {
  const templatesFolderPath = path.resolve(__dirname, 'assets/templates');
  const invoiceTemplate = readFileSync(
    path.join(templatesFolderPath, 'invoice.hbs'),
    'utf-8'
  );
  const invoicePDFDocumentData: PDFDocumentData = {
    template: invoiceTemplate,
    data: invoiceData,
    // Checkout documentation at https://pptr.dev/api/puppeteer.pdfoptions#headertemplate
    headerTemplate: `<div style="font-size: 10px; display: block; width: 100%; text-align: center;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
    metadata: {
      title: 'Test title',
      subject: 'Test subject',
      author: 'This is the author',
      producer: 'This is the producer',
      creator: 'This is the creator',
    },
  };

  it('should return 401 if no authorization header is provided', async () => {
    let errorCaught = false;

    try {
      await axios.post(`/api/pdf-generator`, invoicePDFDocumentData);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        errorCaught = true;
        expect(error.response.status).toBe(401);
        expect(error.response.data.error).toBe('Unauthorized');
      }
    }

    if (!errorCaught) {
      throw new Error('Request did not fail as expected');
    }
  });

  it('generate a PDF with the data passed in the request body', async () => {
    try {
      const res = await axios.post(
        `/api/pdf-generator`,
        invoicePDFDocumentData,
        { headers: getHeaders() }
      );
      outputFile('invoice.pdf', res.data.data);
      expect(res.status).toBe(201);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          `Request failed with status ${
            error.response?.status
          }: ${JSON.stringify(error.response?.data)}`
        );
      } else {
        throw new Error(`An unexpected error occurred : ${error.message}`);
      }
    }
  });
});
