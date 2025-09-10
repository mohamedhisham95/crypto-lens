import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { TransformedCoinSearch } from '@/types/coin-search';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const coin_search = await baseAPI<TransformedCoinSearch>(`/search`, {
      query: queryParams,
    });

    return NextResponse.json({
      success: true,
      coins: coin_search?.coins || [],
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
