import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmLoggerService } from '../logger/typeorm-logger.service';
import { ConfigService } from './config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly typeOrmLogger?: TypeOrmLoggerService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const prettyLoggerEnabled = this.configService.isDebug() && this.configService.isLocal();

    return {
      ...this.configService.getDatabaseConfig(),
      synchronize: false,
      entities: [__dirname + ' /../**/*.entity{.ts}'],
      migrations: [__dirname + '/../migration/*{.ts}'],
      migrationsRun: true,
      cli: { migrationsDir: 'src/migration' },
      namingStrategy: new SnakeNamingStrategy(),
      logger: prettyLoggerEnabled ? undefined : this.typeOrmLogger, // pretty logger is default
    };
  }
}
