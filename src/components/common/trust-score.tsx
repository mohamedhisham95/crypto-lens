'use client';

// Lib
import { cn } from '@/lib/utils';

// UI
import { Badge } from '@/components/ui/badge';

type Props = {
  score: number;
  className?: string;
};

export function TrustScore({ score, className = '' }: Props) {
  return (
    <Badge
      variant="outline"
      className={cn(
        className,
        score > 7
          ? 'border-primary text-primary'
          : score > 5 && score <= 7
          ? 'border-yellow-600 text-yellow-600'
          : 'border-destructive text-destructive'
      )}
    >
      {score}/10
    </Badge>
  );
}
