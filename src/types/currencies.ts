export type SupportedCurrenciesResponse =
  | {
      success: true;
      supported_currencies: string[];
    }
  | { success: false; code: number; message: string };
