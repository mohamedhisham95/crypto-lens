// Lib
import { baseAPI } from '@/lib/base-api';

// Transformer
import { transformCoinData } from '@/transformer/coin-analysis';

// Types
import { BaseAPIError } from '@/types/api';
import { CoinData, CoinDataResponse } from '@/types/coin';

export async function getCoinData(coin_id: string): Promise<CoinDataResponse> {
  try {
    const coin_data = await baseAPI<CoinData>(
      `/coins/${coin_id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
      {
        revalidate: 900,
        tags: ['coin_data'],
      }
    );

    return {
      success: true,
      ...transformCoinData(coin_data),
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
