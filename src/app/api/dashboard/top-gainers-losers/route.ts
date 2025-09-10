import { NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { CoinList } from '@/types/coins';

export async function GET() {
  const limit = 5;
  try {
    const markets = await baseAPI<CoinList[]>(`/coins/markets`);

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

    return NextResponse.json({
      success: true,
      top_gainers,
      top_losers,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Something went wrong',
      },
      { status: error?.status || 500 }
    );
  }
}
