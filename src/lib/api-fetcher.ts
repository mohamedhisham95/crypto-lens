export async function apiFetcher<T>(
  endpoint: string,
  query?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = new URL(`/api${endpoint}`, window.location.origin);

  if (query) {
    Object.entries(query).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const json = await res.json();

  if (!json.success) {
    console.log('json :: ', json);
    throw new Error(json.message || 'Something went wrong');
  }

  return json.data || json;
}
