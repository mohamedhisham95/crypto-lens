import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { CoinHistoricalChartData } from '@/types/coin';

// Transformer
import { transformHistoricalChartData } from '@/transformer/coin-analysis';

export async function GET(
  req: NextRequest,
  { params }: { params: { coin_id: string } }
) {
  const { coin_id } = await params;

  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const coin_historical_chart_data = await baseAPI<CoinHistoricalChartData>(
      `/coins/${coin_id}/market_chart`,
      {
        query: queryParams,
      }
    );

    return NextResponse.json({
      success: true,
      ...transformHistoricalChartData(coin_historical_chart_data),
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
