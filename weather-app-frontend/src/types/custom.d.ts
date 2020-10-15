import { Environment } from '@enums/environment.enum';

export {};

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      npm_package_version: string;
      REACT_APP_API_URL: string;
      REACT_APP_ENV: Environment;
      REACT_APP_DEFAULT_CITY: string;
    }
  }
}
