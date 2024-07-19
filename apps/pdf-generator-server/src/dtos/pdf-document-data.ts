import { IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf, ValidateNested } from 'class-validator';
import { PDFDocumentData } from '@stemys/pdf-generator/constants';
import { PDFMetadataForm } from './pdf-metadata';
import { Type } from 'class-transformer';

export class PDFDocumentDataForm implements PDFDocumentData {
  @IsNotEmpty()
  data: any;
  @IsNotEmpty()
  @Type(() => PDFMetadataForm)
  @ValidateNested()
  metadata: PDFMetadataForm;
  @IsOptional()
  @IsString()
  @ValidateIf((obj) => obj.template || obj.templateUrl)
  template?: string;
  @IsOptional()
  @IsUrl()
  @ValidateIf((obj) => obj.template || obj.templateUrl)
  templateUrl?: string;
}
