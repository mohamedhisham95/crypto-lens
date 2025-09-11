import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { Exchange } from '@/types/exchange';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ exchange_id: string }> }
): Promise<NextResponse> {
  const { exchange_id } = await context.params;

  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const exchange = await baseAPI<Exchange>(`/exchanges/${exchange_id}`, {
      query: queryParams,
    });

    return NextResponse.json({
      success: true,
      exchange: exchange || {},
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
