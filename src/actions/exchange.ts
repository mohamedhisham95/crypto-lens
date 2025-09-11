// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { BaseAPIError } from '@/types/api';
import { Exchange, ExchangeResponse } from '@/types/exchange';

export async function getExchangeData(
  exchange_id: string
): Promise<ExchangeResponse> {
  try {
    const exchange = await baseAPI<Exchange>(`/exchanges/${exchange_id}`, {
      tags: ['exchange'],
    });

    return {
      success: true,
      exchange: exchange || {},
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
