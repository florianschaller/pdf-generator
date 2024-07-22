import { NodeEnvironment } from './env.validation';

export interface Configuration {
  environment: NodeEnvironment;
  port: number;
  globalPrefix: string;
  basicAuth: {
    username: string;
    password: string;
  };
}

export default () =>
  ({
    environment: process.env.NODE_ENV || NodeEnvironment.Development,
    port: parseInt(process.env.PORT, 10) || 3000,
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    basicAuth: {
      username: process.env.BASIC_AUTH_USERNAME || 'admin',
      password: process.env.BASIC_AUTH_PASSWORD || 'changeIt1!',
    },
  } as Configuration);
