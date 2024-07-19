import axios, { AxiosError } from 'axios';
import { PDFDocumentData } from '@stemys/pdf-generator/constants';
import * as path from 'path';
import { outputFileSync } from 'fs-extra';

describe('POST /api/pdf-generator/generate', () => {
  it('generate a PDF with the data passed in the request body', async () => {
    const data: PDFDocumentData = {
      template: `<h1>{{title}}</h1>
      <p>{{body}}</p>
      <p>{{footer}}</p>`,
      data: {
        title: 'This is the title',
        body: 'This is the body',
        footer: 'This is the footer'
      },
      metadata: {
        title: 'Test title',
        subject: 'Test subject',
        author: 'This is the author',
        producer: 'This is the producer',
        creator: 'This is the creator'
      },
    }
    try {
      const res = await axios.post(`/api/pdf-generator/generate`, data);
      const distFolderPath = path.resolve(__dirname, '../../../../dist/apps/pdf-generator-server-e2e'); // Adjust the path to your dist folder
      const outputPath = path.join(distFolderPath, 'test.pdf');
      const buffer = Buffer.from(res.data.data);
      outputFileSync(outputPath, buffer);
      expect(res.status).toBe(201);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  });
});
