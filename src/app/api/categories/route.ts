import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { ExchangeList } from '@/types/exchanges';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const categories = await baseAPI<ExchangeList[]>(`/coins/categories`, {
      query: queryParams,
    });

    return NextResponse.json({
      success: true,
      categories: categories || [],
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
