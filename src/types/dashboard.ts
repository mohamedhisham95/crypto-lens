import { CoinList } from './coin';

// Top Gainers/Losers
export type TopGainersLosersResponse =
  | {
      success: true;
      top_gainers: CoinList[];
      top_losers: CoinList[];
    }
  | { success: false; code: number; message: string };

// Global Data
export interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface TransformedGlobalData {
  data: GlobalData;
}

export type GlobalDataResponse =
  | {
      success: true;
      global_data: GlobalData;
    }
  | { success: false; code: number; message: string };
