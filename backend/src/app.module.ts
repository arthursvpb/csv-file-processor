import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { FileProcessorModule } from './file-processor/file-processor.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisModule,
    FileProcessorModule,
    ProductsModule,
  ],
})
export class AppModule {}
