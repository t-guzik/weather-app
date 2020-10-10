import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestInterceptor } from './common/interceptors/log-request.interceptor';
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogRequestInterceptor,
    },
  ],
})
export class AppModule {}
