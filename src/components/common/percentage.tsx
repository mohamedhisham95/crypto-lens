import { cn } from '@/lib/utils';

type Props = {
  value: number;
  decimals?: number;
  position?: 'justify-start' | 'justify-end' | 'justify-center';
  text_size?: string;
};

export function Percentage({
  value,
  decimals = 4,
  position = 'justify-end',
  text_size = 'text-xs',
}: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-1',
        text_size,
        position,
        value > 0
          ? 'text-primary'
          : value < 0
          ? 'text-destructive'
          : 'text-primary-foreground'
      )}
    >
      {value > 0 ? '▲' : value < 0 ? '▼' : ''}
      <span>{value.toFixed(decimals)}%</span>
    </div>
  );
}
