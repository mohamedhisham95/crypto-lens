// Types
import { ExchangeInfo } from '@/types/exchange';

// Components
import { PriceCountUp, TrustScore } from '@/components/common';

// UI
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data: ExchangeInfo;
  isFetching?: boolean;
};

export function ExchangeValues({ data, isFetching }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="py-3">
        <CardContent className="flex items-center px-3">
          <div className="flex flex-col gap-2">
            {isFetching ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <PriceCountUp value={data?.trade_volume_24h_btc} />
            )}
            <span className="text-xs text-muted-foreground">
              Trade Volume 24H
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="py-3">
        <CardContent className="flex items-center px-3">
          <div className="flex flex-col gap-2">
            {isFetching ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <TrustScore score={data.trust_score} className="text-base" />
            )}
            <span className="text-xs text-muted-foreground">Trust Score</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
