// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { BaseAPIError } from '@/types/api';
import { Exchange, ExchangeInfo, ExchangeResponse } from '@/types/exchange';

export async function getExchangeData(
  exchange_id: string
): Promise<ExchangeResponse> {
  try {
    const exchange = await baseAPI<Exchange>(`/exchanges/${exchange_id}`, {
      tags: ['exchange'],
    });

    const { tickers, ...rest } = exchange;

    return {
      success: true,
      exchange_info: rest as ExchangeInfo,
      exchange_tickers: tickers || [],
    };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}
