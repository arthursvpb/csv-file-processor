import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService {
  private readonly apiUrl =
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

  constructor(private readonly httpService: HttpService) {}

  async getMultipleExchangeRates(
    currencies: string[],
  ): Promise<Record<string, number>> {
    try {
      const response = await lastValueFrom(this.httpService.get(this.apiUrl));

      if (!response?.data || typeof response?.data !== 'object') {
        console.error('Invalid response from exchange API:', response?.data);
        throw new InternalServerErrorException(
          'Invalid exchange rate response',
        );
      }

      const rates: Record<string, number> = {};
      currencies.forEach((currency) => {
        if (response.data?.usd?.[currency.toLowerCase()]) {
          rates[currency] = response.data.usd[currency.toLowerCase()];
        }
      });

      return rates;
    } catch (error) {
      console.error('Exchange rate API request failed:', error);
      throw new InternalServerErrorException(
        `Failed to fetch exchange rates: ${error.message}`,
      );
    }
  }
}
