import { NextRequest, NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { ExchangeVolumeChartData } from '@/types/exchange';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ exchange_id: string }> }
): Promise<NextResponse> {
  const { exchange_id } = await context.params;

  try {
    const searchParams = req.nextUrl.searchParams;

    const queryParams = Object.fromEntries(searchParams.entries());

    const volume = await baseAPI<ExchangeVolumeChartData[]>(
      `/exchanges/${exchange_id}/volume_chart`,
      {
        query: queryParams,
      }
    );

    return NextResponse.json({
      success: true,
      volume: volume || [],
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
