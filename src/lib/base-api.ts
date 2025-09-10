// Types
import { BaseAPIError } from '@/types/api';

const KEY = process.env.COINGECKO_API_KEY || '';
const BASE =
  process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';
const HEADER_NAME = 'x-cg-demo-api-key';

type FetchOpts = {
  tags?: string[];
  query?: Record<string, string | number | boolean | undefined>; // ✅ Added query support
};

export async function baseAPI<T>(
  path: string,
  { tags = [], query }: FetchOpts = {}
): Promise<T> {
  // ✅ Build query string dynamically if passed
  const qs = query
    ? '?' +
      Object.entries(query)
        .map(
          ([k, v]) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
        )
        .join('&')
    : '';

  const headers: Record<string, string> = {};
  if (KEY) headers[HEADER_NAME] = KEY;

  const res = await fetch(`${BASE}${path}${qs}`, {
    headers,
    next: { tags },
    cache: 'no-store',
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);

    let finalMessage = msg;
    try {
      const parsed = JSON.parse(msg);
      if (parsed?.status?.error_message) {
        finalMessage = parsed.status.error_message;
      } else {
        finalMessage = JSON.stringify(parsed, null, 2);
      }
    } catch {
      // Fallback: leave plain text as-is
    }

    throw {
      status: res.status,
      message: finalMessage || 'Something went wrong!',
    } as BaseAPIError;
  }

  return res.json();
}
