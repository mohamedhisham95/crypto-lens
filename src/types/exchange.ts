// Exchange Data
export interface ConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
}

export interface Ticker {
  base: string;
  target: string;
  converted_volume: ConvertedVolume;
  trust_score: string;
  trade_url: string;
  last_traded_at: string; // ISO timestamp
  last_fetch_at: string; // ISO timestamp
}

export interface Exchange {
  name: string;
  year_established: number;
  country: string | null;
  description: string | null;
  url: string;
  image: string;
  facebook_url: string | null;
  reddit_url: string | null;
  telegram_url: string | null;
  slack_url: string | null;
  other_url_1: string | null;
  other_url_2: string | null;
  twitter_handle: string | null;
  trust_score: number;
  trust_score_rank: number;
  coins: number;
  pairs: number;
  trade_volume_24h_btc: number;
  tickers: Ticker[];
}

export interface ExchangeInfo {
  name: string;
  year_established: number;
  country: string | null;
  description: string | null;
  url: string;
  image: string;
  facebook_url: string | null;
  reddit_url: string | null;
  telegram_url: string | null;
  slack_url: string | null;
  other_url_1: string | null;
  other_url_2: string | null;
  twitter_handle: string | null;
  trust_score: number;
  trust_score_rank: number;
  coins: number;
  pairs: number;
  trade_volume_24h_btc: number;
}

export type ExchangeResponse =
  | {
      success: true;
      exchange_info: ExchangeInfo;
      exchange_tickers: Ticker[];
    }
  | { success: false; code: number; message: string };

// Exchange Volume Chart

export type ExchangeVolumeChartData = [number, string];

export type ExchangeVolumeChartDataResponse =
  | {
      success: true;
      volume: ExchangeVolumeChartData[];
    }
  | { success: false; code: number; message: string };
