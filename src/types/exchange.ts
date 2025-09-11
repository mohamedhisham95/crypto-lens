export interface ExchangeList {
  id: string;
  name: string;
  year_established: number;
  country: string | null;
  description: string | null;
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
}
