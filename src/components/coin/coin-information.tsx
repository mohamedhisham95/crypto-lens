'use client';

import React from 'react';
import Image from 'next/image';

// Icons
import { Info } from 'lucide-react';

// Types
import type { CoinInfo } from '@/types/coin';

// Components
import { Percentage, PriceCountUp } from '@/components/common';

// UI
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  data: CoinInfo;
  isFetching?: boolean;
};

export const CoinInformation = React.memo(function CoinInformation({
  data,
  isFetching,
}: Props) {
  return (
    <Card className="py-3">
      <CardContent className="flex items-center justify-between px-3">
        {isFetching ? (
          <>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={data?.image}
                  width={24}
                  height={24}
                  alt={data?.symbol}
                  className="h-6 w-6 object-contain"
                />
                <span className="text-lg font-semibold">{data?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">#{data?.rank}</Badge>
                <Badge variant="outline" className="uppercase">
                  {data?.symbol}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Info className="icon-sm stroke-muted-foreground" />
                  </DialogTrigger>
                  <DialogContent className="max-h-48 lg:max-h-64 overflow-auto">
                    <DialogHeader>
                      <DialogTitle>{data?.name}</DialogTitle>
                      <DialogDescription>
                        {data?.description}
                        {data?.description}
                        {data?.description}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold">
                <PriceCountUp value={data?.current_price_in_usd} />
              </div>

              <div className="flex items-center gap-2">
                <Percentage
                  value={data?.chg_percentage_24h_in_usd}
                  decimals={2}
                  position="justify-start"
                />

                <span className="text-muted-foreground text-xs">(24H)</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
});
