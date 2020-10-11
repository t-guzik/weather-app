import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { Environment } from '../common/enums/environment.enum';

export interface ConfigSchemaInterface {
  cors: {
    allowedHeaders?: string;
    methods: string;
    origin: string;
  };
  db: Omit<SqliteConnectionOptions, 'type'>;
  debug: boolean;
  env: Environment;
  gracefulShutdown: {
    timeoutMs: number;
  };
  logger: LoggerConfig;
  requestLogger: RequestLoggerConfig;
  server: ServerConfig;
  weather: WeatherApiConfig;
}

export interface ServerConfig {
  apiPrefix: string;
  apiVersion: number;
  port: number;
  version: string;
}

export interface RequestLoggerConfig {
  details: boolean;
  enabled: boolean;
}

export interface CorsConfig {
  allowedHeaders?: string;
  methods?: string;
  origin?: string;
}

export interface LoggerConfig {
  colorized: boolean;
  enabled: boolean;
  level: string;
}

export interface WeatherApiConfig {
  cacheTtlMs: number;
  url: string;
}
