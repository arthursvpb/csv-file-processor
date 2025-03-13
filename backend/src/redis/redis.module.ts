import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: `redis://${config.get<string>('REDIS_HOST', 'localhost')}:${config.get<number>('REDIS_PORT', 6379)}`,
      }),
    }),
  ],
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService],
})
export class RedisModule {}
