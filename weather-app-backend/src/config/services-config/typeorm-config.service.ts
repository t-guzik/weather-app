import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmLoggerService } from '../../logger/typeorm-logger.service';
import { ConfigService } from '../config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly typeOrmLogger?: TypeOrmLoggerService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const prettyLoggerEnabled = this.configService.isDebug() && this.configService.isLocal();

    return {
      ...this.configService.getDatabaseConfig(),
      synchronize: true,
      migrationsRun: true,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migration/*{.ts,.js}'],
      cli: { migrationsDir: 'src/migration' },
      namingStrategy: new SnakeNamingStrategy(),
      logger: prettyLoggerEnabled ? undefined : this.typeOrmLogger, // pretty logger is default
    };
  }
}
