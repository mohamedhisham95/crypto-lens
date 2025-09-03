// Lib
import { formatCurrency } from '@/lib/formatter';

type Props = {
  low: number;
  high: number;
  current: number;
  currency?: string;
};

export const PriceRangeBar = ({
  low,
  high,
  current,
  currency = 'USD',
}: Props) => {
  // Check for invalid input to prevent errors
  if (
    low === undefined ||
    high === undefined ||
    current === undefined ||
    low > high
  ) {
    console.error(
      'Invalid props: low, high, and current must be valid numbers with low <= high.'
    );
    return null; // Return nothing if the data is invalid
  }

  // Calculate the percentage position of the current price on the bar.
  // We handle the edge case where low and high are the same to avoid division by zero.
  const positionPercentage =
    high - low > 0 ? ((current - low) / (high - low)) * 100 : 0;

  return (
    <div className="flex flex-col p-4 w-full bg-muted/50 text-primary-foreground rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-destructive">24h Low</span>
        <span className="text-xs font-medium text-primary">24h High</span>
      </div>

      {/* The main progress bar container */}
      <div className="relative h-2 bg-input dark:bg-muted rounded-full overflow-hidden">
        {/* The colored fill bar from the low to the current price */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-destructive via-yellow-400 to-primary"
          style={{ width: `${positionPercentage}%` }}
        ></div>

        {/* The current price marker, positioned dynamically with 'left' */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 w-3 h-3 bg-muted-foreground dark:bg-accent-foreground rounded-full shadow-md z-10"
          style={{ left: `${positionPercentage}%` }}
          aria-label="Current Price Marker"
        ></div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs font-bold text-destructive">
          {formatCurrency({ amount: low, currency: currency })}
        </span>
        <span className="text-xs font-bold text-primary">
          {formatCurrency({ amount: high, currency: currency })}
        </span>
      </div>
    </div>
  );
};
