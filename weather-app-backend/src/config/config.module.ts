import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './typeorm-config.service';

@Global()
@Module({
  providers: [ConfigService, TypeOrmConfigService],
  exports: [ConfigService, TypeOrmConfigService],
})
export class ConfigModule {}
