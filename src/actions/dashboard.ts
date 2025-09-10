// Lib
import { baseAPI } from '@/lib/base-api';

// Interfaces
import { BaseAPIError } from '@/types/api';
import { CoinList } from '@/types/coins';
import {
  TopGainersLosersResponse,
  TransformedGlobalData,
  GlobalDataResponse,
  TransformedTrendingCoins,
  TrendingCoinsResponse,
} from '@/types/dashboard';

export async function getGlobalData(): Promise<GlobalDataResponse> {
  try {
    const global_data = await baseAPI<TransformedGlobalData>(`/global`, {
      tags: ['global_data'],
    });

    return { success: true, global_data: global_data?.data };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}

export async function getTopGainersLosers(): Promise<TopGainersLosersResponse> {
  const vs = 'usd';
  const limit = 5;

  try {
    const markets = await baseAPI<CoinList[]>(
      `/coins/markets?vs_currency=${vs}&order=market_cap_desc&per_page=250&page=1&price_change_percentage=24h&sparkline=false`,
      { tags: ['top_gainers_losers'] }
    );

    // Optional volume floor similar to CoinGecko’s note (helps avoid illiquid moves)
    const filtered = markets.filter((r) => (r.total_volume ?? 0) >= 50000);

    const withChange = filtered.filter(
      (r) => typeof r.price_change_percentage_24h === 'number'
    );

    const top_gainers = [...withChange]
      .sort(
        (a, b) =>
          b.price_change_percentage_24h! - a.price_change_percentage_24h!
      )
      .slice(0, limit);

    const top_losers = [...withChange]
      .sort(
        (a, b) =>
          a.price_change_percentage_24h! - b.price_change_percentage_24h!
      )
      .slice(0, limit);

    return { success: true, top_gainers, top_losers };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}

export async function getTrendingCoins(): Promise<TrendingCoinsResponse> {
  try {
    const trending_coins = await baseAPI<TransformedTrendingCoins>(
      `/search/trending`,
      {
        tags: ['trending_coins'],
      }
    );

    return { success: true, coins: trending_coins?.coins || [] };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}
