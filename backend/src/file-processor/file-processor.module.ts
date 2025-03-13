import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileProcessorController } from './file-processor.controller';
import { FileProcessorService } from './file-processor.service';
import { Product } from '../products/product.entity';
import { RedisModule } from '../redis/redis.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    RedisModule,
    ExchangeModule,
  ],
  controllers: [FileProcessorController],
  providers: [FileProcessorService],
})
export class FileProcessorModule {}
