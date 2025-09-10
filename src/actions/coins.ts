// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { BaseAPIError } from '@/types/api';
import { CoinList } from '@/types/coins';
import { CoinsPayload, CoinsResponse } from '@/types/coins';

export async function getCoins({
  vs_currency,
  order,
  page,
  price_change_percentage,
}: CoinsPayload): Promise<CoinsResponse> {
  try {
    const per_page = 20;

    const coins = await baseAPI<CoinList[]>(
      `/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&price_change_percentage=${encodeURIComponent(
        price_change_percentage.join(',')
      )}&precision=2`
    );

    return { success: true, coins: coins || [] };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}
