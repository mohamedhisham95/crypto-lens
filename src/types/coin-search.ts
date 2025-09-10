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
