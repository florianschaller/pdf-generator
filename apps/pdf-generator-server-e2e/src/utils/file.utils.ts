import path from 'path';
import { outputFileSync } from 'fs-extra';

const distFolderPath = path.resolve(
  __dirname,
  '../../../../dist/apps/pdf-generator-server-e2e'
);

export const outputFile = (fileName: string, file: ArrayBuffer | string) => {
  const outputPath = path.join(distFolderPath, fileName);
  let buffer: Buffer;

  if (typeof file === 'string') {
    buffer = Buffer.from(file, 'utf-8');
  } else {
    buffer = Buffer.from(file);
  }

  try {
    outputFileSync(outputPath, buffer);
    console.log(`File saved at ${outputPath}`);
  } catch (error) {
    throw new Error(
      `Failed to save the file at ${outputPath}: ${error.message}`
    );
  }
};
