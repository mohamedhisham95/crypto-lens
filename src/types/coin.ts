// Coin List

export interface CoinList {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

// Coin Search

export interface CoinSearch {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface TransformedCoinSearch {
  coins: CoinSearch[];
}

export type CoinSearchResponse =
  | {
      success: true;
      coins: CoinSearch[];
    }
  | { success: false; code: number; message: string };

// Coin Data

export type CurrencyMap = Record<string, number>;

export interface Links {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  announcement_url: string[];
  subreddit_url: string;
}

export interface AssetImage {
  thumb: string;
  small: string;
  large: string;
}

export interface MarketData {
  current_price: CurrencyMap;
  market_cap: CurrencyMap;
  market_cap_rank: number;
  fully_diluted_valuation: CurrencyMap;
  market_cap_fdv_ratio: number;
  total_volume: CurrencyMap;
  price_change_percentage_1h_in_currency: CurrencyMap;
  price_change_percentage_24h_in_currency: CurrencyMap;
  price_change_percentage_7d_in_currency: CurrencyMap;
  price_change_percentage_14d_in_currency: CurrencyMap;
  price_change_percentage_30d_in_currency: CurrencyMap;
  price_change_percentage_60d_in_currency: CurrencyMap;
  price_change_percentage_200d_in_currency: CurrencyMap;
  price_change_percentage_1y_in_currency: CurrencyMap;
  price_change_24h_in_currency: CurrencyMap;
  market_cap_change_24h_in_currency: CurrencyMap;
  market_cap_change_percentage_24h_in_currency: CurrencyMap;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  low_24h: CurrencyMap;
  high_24h: CurrencyMap;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  categories: string[];
  description: {
    en: string;
  };
  links: Links;
  image: AssetImage;
  genesis_date: string; // ISO date string (e.g., "2009-01-03")
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
}

export interface CoinInfo {
  rank: number;
  name: string;
  image: string;
  symbol: string;
  description: string;
  current_price_in_usd: number;
  chg_percentage_24h_in_usd: number;
}

export interface CoinOverview {
  market_cap: CurrencyMap;
  market_cap_fdv_ratio: number;
  fully_diluted_valuation: CurrencyMap;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  total_volume: CurrencyMap;
  low_24h: CurrencyMap;
  high_24h: CurrencyMap;
  current_price: CurrencyMap;
}

export interface CoinPriceAndChangePercentage {
  price_change_percentage_1h_in_currency: CurrencyMap;
  price_change_percentage_24h_in_currency: CurrencyMap;
  price_change_percentage_7d_in_currency: CurrencyMap;
  price_change_percentage_14d_in_currency: CurrencyMap;
  price_change_percentage_30d_in_currency: CurrencyMap;
  price_change_percentage_60d_in_currency: CurrencyMap;
  price_change_percentage_200d_in_currency: CurrencyMap;
  price_change_percentage_1y_in_currency: CurrencyMap;
  price_change_24h_in_currency: CurrencyMap;
  market_cap_change_24h_in_currency: CurrencyMap;
  market_cap_change_percentage_24h_in_currency: CurrencyMap;
}

export type CoinDataResponse =
  | {
      success: true;
      coin_info: CoinInfo;
      coin_overview: CoinOverview;
      coin_links: Links;
      coin_price_and_change_percentage: CoinPriceAndChangePercentage;
    }
  | { success: false; code: number; message: string };

// Coin Historical Chart Data

export interface CoinHistoricalChartDataPayload {
  coin_id: string;
  vs_currency: string;
  days: number;
  interval: string;
}

export interface CoinHistoricalChartData {
  prices: [number, number][];
  market_caps: [number, number][];
}

export type CoinHistoricalChartDataResponse =
  | {
      success: true;
      prices: [number, number][];
      market_caps: [number, number][];
    }
  | { success: false; code: number; message: string };

// Coin OHLC Chart Data

export interface CoinOHLCChartDataPayload {
  coin_id: string;
  vs_currency: string;
  days: number;
}

export type CoinOHLCChartData = [number, number, number, number, number];

export type CoinOHLCChartDataResponse =
  | {
      success: true;
      ohlc: CoinOHLCChartData[];
    }
  | { success: false; code: number; message: string };
