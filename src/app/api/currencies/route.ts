import { NextResponse } from 'next/server';

// Lib
import { baseAPI } from '@/lib/base-api';

export async function GET() {
  try {
    const supported_currencies = await baseAPI<string[]>(
      `/simple/supported_vs_currencies`
    );

    return NextResponse.json({
      success: true,
      supported_currencies: supported_currencies || [],
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
