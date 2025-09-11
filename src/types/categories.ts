export interface Category {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string | null;
  top_3_coins_id: string[];
  top_3_coins: string[];
  volume_24h: number;
  updated_at: string;
}

export type CategoryResponse =
  | {
      success: true;
      categories: Category[];
    }
  | { success: false; code: number; message: string };
