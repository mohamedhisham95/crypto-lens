// Interfaces
import { BaseAPIError } from '@/types/api';

const KEY = process.env.COINGECKO_API_KEY || '';
const BASE = 'https://api.coingecko.com/api/v3'; // Demo/Public base
const HEADER_NAME = 'x-cg-demo-api-key'; // Header names per docs

type FetchOpts = {
  revalidate?: number;
  tags?: string[];
};

export async function baseAPI<T>(
  path: string,
  { revalidate = 900, tags = [] }: FetchOpts = {}
): Promise<T> {
  // Revalidate: 900 / 60 = 15 Minutes

  const headers: Record<string, string> = {};
  if (KEY) headers[HEADER_NAME] = KEY;

  const res = await fetch(`${BASE}${path}`, {
    headers,
    next: { revalidate, tags },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);

    let finalMessage = msg;

    // Check if message is JSON and safely parse
    try {
      const parsed = JSON.parse(msg);
      // If it has a nested error message, use that
      if (parsed?.status?.error_message) {
        finalMessage = parsed.status.error_message;
      } else {
        // If JSON exists but doesn't match structure, show full JSON pretty-printed
        finalMessage = JSON.stringify(parsed, null, 2);
      }
    } catch {
      // If it's plain text, just leave it as-is
    }

    throw {
      status: res.status,
      message: finalMessage || 'Something went wrong!',
    } as BaseAPIError;
  }
  return res.json();
}
