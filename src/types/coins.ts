// Types
import { CoinList } from './coin';

export interface CoinsPayload {
  vs_currency: string;
  order: string;
  page: number;
  price_change_percentage: string[];
}

export type CoinsResponse =
  | {
      success: true;
      coins: CoinList[];
    }
  | { success: false; code: number; message: string };
