'use client';

// Lib
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  decimals?: number;
  position?: 'justify-start' | 'justify-end' | 'justify-center';
  text_size?: string;
};

export function Percentage({
  value = 0,
  decimals = 3,
  position = 'justify-end',
  text_size = 'text-xs',
}: Props) {
  // ✅ Normalize value to fixed decimals once, so server & client output match
  const normalizedValue = Number.isFinite(value)
    ? Number(value.toFixed(decimals))
    : 0;

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        text_size,
        position,
        normalizedValue > 0
          ? 'text-primary'
          : normalizedValue < 0
          ? 'text-destructive'
          : 'text-primary-foreground'
      )}
    >
      {Number.isFinite(normalizedValue) ? (
        <>
          {normalizedValue > 0 ? '▲' : normalizedValue < 0 ? '▼' : ''}
          <span>{normalizedValue.toFixed(decimals)}%</span>
        </>
      ) : (
        <span>-</span>
      )}
    </div>
  );
}
