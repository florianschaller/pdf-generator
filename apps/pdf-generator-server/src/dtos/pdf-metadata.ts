import { IsNotEmpty, MinLength } from 'class-validator';
import { PDFMetadata } from '@stemys/pdf-generator/constants';

export class PDFMetadataForm implements PDFMetadata {
  @IsNotEmpty()
  @MinLength(1)
  title: string;
  @IsNotEmpty()
  @MinLength(1)
  subject: string;
  @IsNotEmpty()
  @MinLength(1)
  author: string;
  @IsNotEmpty()
  @MinLength(1)
  producer: string;
  @IsNotEmpty()
  @MinLength(1)
  creator: string;
}
