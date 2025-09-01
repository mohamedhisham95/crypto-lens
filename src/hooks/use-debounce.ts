'use client';

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup the timeout if value or delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
