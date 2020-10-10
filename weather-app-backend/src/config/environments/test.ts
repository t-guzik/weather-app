import { DeepPartial } from 'typeorm';
import { ConfigSchemaInterface } from '../config.interfaces';

export const config: DeepPartial<ConfigSchemaInterface> = {
  db: {
    database: 'weather-db-e2e',
  },
  logger: {
    enabled: false,
  },
  requestLogger: {
    enabled: false,
  },
};
