import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Icons
import { Info } from 'lucide-react';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';

// Types
import { CoinList } from '@/types/coin';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Common
import { Percentage, TooltipWrapper } from '@/components/common';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  title: string;
  data: CoinList[];
  isFetching?: boolean;
};

export function TopGainersLosers({
  title,
  data = [],
  isFetching = false,
}: Props) {
  return (
    <Card className="px-0">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <TooltipWrapper
              side="bottom"
              content={
                <div className="flex items-center gap-1">
                  <span className="text-xs">Cache / Update Frequency:</span>
                  <span className="text-xs">
                    {refetch_interval['top_gainers_losers'] / (60 * 1000)}{' '}
                    Minutes
                  </span>
                </div>
              }
            >
              <Info className="icon-sm stroke-muted-foreground" />
            </TooltipWrapper>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table className="overflow-auto">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">
                #
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Volume
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Chg % (24H)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={`loading-${index}`}
                    className="hover:bg-transparent border-b-0"
                  >
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : data
              ? data.map((coin, index) => (
                  <TableRow
                    key={index}
                    className={cn(index % 2 !== 0 && 'bg-muted/50')}
                  >
                    <TableCell className="text-muted-foreground">
                      {coin.market_cap_rank}
                    </TableCell>
                    <TableCell>
                      <Link href={`/coin/${coin.id}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Image
                            src={coin.image}
                            width={24}
                            height={24}
                            alt={coin.name}
                            className="w-6 h-6"
                          />
                          <span className="truncate">{coin.name}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <TooltipWrapper
                        side="bottom"
                        content={formatCurrency({
                          amount: coin.total_volume,
                          compact: true,
                        })}
                      >
                        <div className="flex justify-end cursor-pointer">
                          {formatCurrency({
                            amount: coin.total_volume,
                          })}
                        </div>
                      </TooltipWrapper>
                    </TableCell>
                    <TableCell>
                      <Percentage
                        value={coin.price_change_percentage_24h}
                        decimals={3}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
