// Lib
import { baseAPI } from '@/lib/base-api';

// Transformer
import {
  transformCoinData,
  transformHistoricalChartData,
  transformOHLCChartData,
} from '@/transformer/coin-analysis';

// Types
import { BaseAPIError } from '@/types/api';
import {
  CoinData,
  CoinDataResponse,
  CoinHistoricalChartDataPayload,
  CoinHistoricalChartData,
  CoinHistoricalChartDataResponse,
  CoinOHLCChartDataPayload,
  CoinOHLCChartDataResponse,
  CoinOHLCChartData,
} from '@/types/coin';

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

export async function getCoinHistoricalChartData({
  coin_id,
  vs_currency,
  days,
  interval,
}: CoinHistoricalChartDataPayload): Promise<CoinHistoricalChartDataResponse> {
  try {
    const coin_historical_chart_data = await baseAPI<CoinHistoricalChartData>(
      `/coins/${coin_id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}&precision=2`,
      {
        tags: ['coin_historical_chart_data'],
      }
    );

    return {
      success: true,
      ...transformHistoricalChartData(coin_historical_chart_data),
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

export async function getCoinOHLCChartData({
  coin_id,
  vs_currency,
  days,
}: CoinOHLCChartDataPayload): Promise<CoinOHLCChartDataResponse> {
  try {
    const coin_ohlc_chart_data = await baseAPI<CoinOHLCChartData[]>(
      `/coins/${coin_id}/ohlc?vs_currency=${vs_currency}&days=${days}&precision=2`,
      {
        tags: ['coin_ohlc_chart_data'],
      }
    );

    return {
      success: true,
      ...transformOHLCChartData(coin_ohlc_chart_data),
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
