// Components
import { CoinComparisonTemplate } from '@/components/coin-comparison';

export default function CoinComparisonPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <CoinComparisonTemplate defaultCoin={'bitcoin'} />
      <CoinComparisonTemplate defaultCoin={'ethereum'} />
    </div>
  );
}
