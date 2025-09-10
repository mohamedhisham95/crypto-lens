'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// Icons
import { Info } from 'lucide-react';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';
import { apiFetcher } from '@/lib/api-fetcher';

// Types
import type { TrendingCoins, TrendingCoinsResponse } from '@/types/dashboard';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { AlertMessage, Percentage, TooltipWrapper } from '@/components/common';

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
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  title: string;
  initialData: TrendingCoinsResponse;
  className?: string;
};

export function TrendingCoins({ title, initialData, className = '' }: Props) {
  // Top Gainers Losers Data
  const { data, isFetching, error, isError } = useQuery<TrendingCoinsResponse>({
    initialData: initialData,
    queryKey: ['trending_coins'],
    queryFn: () => apiFetcher(`/dashboard/trending-coins`),
    refetchInterval: refetch_interval['trending_coins'],
  });

  return (
    <Card className={`px-0 ${className}`}>
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
                    {refetch_interval['trending_coins'] / (60 * 1000)} Minutes
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
              <TableHead className="text-muted-foreground font-semibold">
                Symbol
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Price
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Market Cap
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Chg % (24H)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <>
              {isFetching &&
                !data &&
                Array.from({ length: 5 }).map((_, index) => (
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
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              {!isFetching &&
                data &&
                data.success &&
                data.coins.map(({ item }, index) => (
                  <TableRow
                    key={index}
                    className={cn(index % 2 !== 0 && 'bg-muted/50')}
                  >
                    <TableCell className="text-muted-foreground">
                      {item.market_cap_rank}
                    </TableCell>
                    <TableCell>
                      <Link href={`/coin/${item.id}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Image
                            src={item.large}
                            width={24}
                            height={24}
                            alt={item.name}
                            className="w-6 h-6"
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="uppercase">
                        {item?.symbol}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency({
                        amount: item?.data?.price,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {item?.data?.market_cap}
                    </TableCell>
                    <TableCell>
                      <Percentage
                        value={
                          item.data?.price_change_percentage_24h['usd'] ??
                          Infinity
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          </TableBody>
        </Table>

        {!isFetching && (isError || (data && !data.success)) && (
          <AlertMessage
            message={(error as Error)?.message || 'An error occurred.'}
          />
        )}
      </CardContent>
    </Card>
  );
}
