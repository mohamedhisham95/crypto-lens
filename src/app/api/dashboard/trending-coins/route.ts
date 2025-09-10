import { NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { TransformedTrendingCoins } from '@/types/dashboard';

export async function GET() {
  try {
    const trending_coins = await baseAPI<TransformedTrendingCoins>(
      `/search/trending`
    );

    return NextResponse.json({
      success: true,
      coins: trending_coins?.coins || [],
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
