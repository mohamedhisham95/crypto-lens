import dayjs from 'dayjs';

// Types
import { DateFormatter } from '@/types/formatter';

export function formatCurrency({
  amount,
  currency = 'USD',
  locale = 'en-US',
  compact = false,
  options = {},
}: {
  amount: number;
  currency?: string;
  locale?: string;
  compact?: boolean;
  options?: Intl.NumberFormatOptions;
}): string {
  // If amount is null, undefined, or not a finite number, return "-"
  if (
    amount === null ||
    amount === undefined ||
    isNaN(Number(amount)) ||
    !isFinite(Number(amount))
  ) {
    return '-';
  }

  // Define base options for number formatting
  const baseOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options, // Merge any custom options
  };

  // If compact is true, apply the compact notation
  if (compact) {
    baseOptions.notation = 'compact';
    baseOptions.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat(locale, baseOptions).format(amount);
}

export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {}
): string {
  // If amount is null, undefined, or not a finite number, return "-"
  if (
    value === null ||
    value === undefined ||
    isNaN(Number(value)) ||
    !isFinite(Number(value))
  ) {
    return '-';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export const removeProtocol = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // The hostname includes the domain and subdomains (e.g., www.bitcoin.org)
    return parsedUrl.hostname;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    // If the URL is invalid (e.g., "bitcoin.org" without a protocol),
    // we can add a fallback. In this case, we just return the original string.
    return url;
  }
};

export const formatDate = ({ type, date }: DateFormatter) => {
  let result: string = '';
  switch (type) {
    case 'full-date-time':
      result = dayjs(date).format('DD MMM YYYY HH:mm');
      break;
    case 'full-date':
      result = dayjs(date).format('DD MMM YYYY');
      break;
    case 'date-month-time':
      result = dayjs(date).format('DD MMM HH:mm');
      break;
    case 'y-m-d':
      result = dayjs(date).format('YYYY-MM-DD');
      break;

    default:
      result = dayjs(date).format('YYYY-MM-DD');
      break;
  }

  return result;
};
