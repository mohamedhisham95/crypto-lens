import { NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { TransformedGlobalData } from '@/types/dashboard';

export async function GET() {
  try {
    const global_data = await baseAPI<TransformedGlobalData>(`/global`);

    return NextResponse.json({
      success: true,
      global_data: global_data?.data,
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
