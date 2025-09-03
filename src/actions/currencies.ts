// Lib
import { baseAPI } from '@/lib/base-api';

// Types
import { BaseAPIError } from '@/types/api';
import { SupportedCurrenciesResponse } from '@/types/currencies';

export async function getSupportedCurrencies(): Promise<SupportedCurrenciesResponse> {
  try {
    const supported_currencies = await baseAPI<string[]>(
      `/simple/supported_vs_currencies`
    );

    return { success: true, supported_currencies: supported_currencies || [] };
  } catch (error: unknown) {
    const err = error as BaseAPIError;
    return {
      success: false,
      code: err?.status || 500,
      message: err?.message || 'Something went wrong while fetching API usage.',
    };
  }
}
