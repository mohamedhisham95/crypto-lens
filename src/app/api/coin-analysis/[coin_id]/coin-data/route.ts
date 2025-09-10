import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { CoinData } from '@/types/coin';

// Transformer
import { transformCoinData } from '@/transformer/coin-analysis';

export async function GET(
  req: NextRequest,
  { params }: { params: { coin_id: string } }
) {
  const { coin_id } = await params;

  try {
    // ✅ Get query params from client request
    const searchParams = req.nextUrl.searchParams;

    // ✅ Convert them into a plain object
    const queryParams = Object.fromEntries(searchParams.entries());

    // ✅ Fetch coin data with dynamic query params
    const coin_data = await baseAPI<CoinData>(`/coins/${coin_id}`, {
      query: queryParams,
    });

    return NextResponse.json({
      success: true,
      ...transformCoinData(coin_data),
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
