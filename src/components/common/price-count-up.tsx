import CountUp from 'react-countup';

// Lib
import { formatCurrency } from '@/lib/formatter';

export function PriceCountUp({
  value,
  currency = 'USD',
}: {
  value: number;
  currency?: string;
}) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1.5}
      formattingFn={(num) =>
        formatCurrency({
          amount: num,
          currency,
        })
      }
    />
  );
}
