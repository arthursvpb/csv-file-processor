import { Controller, Get, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('set')
  async setKey(@Query('key') key: string, @Query('value') value: string) {
    if (!key || !value) return { message: 'Key and value are required.' };

    await this.redisService.setValue(key, value);
    return { message: `Key ${key} set with value ${value}` };
  }

  @Get('get')
  async getKey(@Query('key') key: string) {
    if (!key) return { message: 'Key is required.' };

    const value = await this.redisService.getValue(key);
    return { key, value };
  }
}
