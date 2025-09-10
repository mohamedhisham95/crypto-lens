import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { CoinOHLCChartData } from '@/types/coin';

// Transformer
import { transformOHLCChartData } from '@/transformer/coin-analysis';

export async function GET(
  req: NextRequest,
  { params }: { params: { coin_id: string } }
) {
  const { coin_id } = await params;

  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const coin_ohlc_chart_data = await baseAPI<CoinOHLCChartData[]>(
      `/coins/${coin_id}/ohlc`,
      {
        query: queryParams,
      }
    );

    return NextResponse.json({
      success: true,
      ...transformOHLCChartData(coin_ohlc_chart_data),
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
