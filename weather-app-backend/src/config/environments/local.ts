import { DeepPartial } from 'typeorm';
import { ConfigSchemaInterface } from '../config.interfaces';

export const config: DeepPartial<ConfigSchemaInterface> = {
  debug: true,
  logger: {
    colorized: true,
    level: 'info',
  },
  requestLogger: {
    details: true,
  },
};
