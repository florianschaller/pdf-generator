import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsOptional()
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsOptional()
  @IsString()
  GLOBAL_PREFIX: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  BASIC_AUTH_USERNAME: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  BASIC_AUTH_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
