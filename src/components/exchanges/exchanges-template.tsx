'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Icons
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';
import { apiFetcher } from '@/lib/api-fetcher';

// Types
import { ExchangesResponse } from '@/types/exchanges';

// Components
import { AlertMessage, InfoTooltip, TrustScore } from '@/components/common';

// UI
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function ExchangesTemplate() {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();

  const LIMIT = 10; // 10 * 20 = 200 Records Of Exchanges

  const page = Number(searchParams.get('page')) || 1;

  // Coins
  const { data, isFetching, isError, error } = useQuery<ExchangesResponse>({
    queryKey: ['exchanges', page],
    queryFn: () =>
      apiFetcher(`/exchanges`, {
        per_page: 20,
        page: Number(searchParams.get('page')) || 1,
      }),
    enabled: page >= 1 && page <= LIMIT,
  });

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  // Error UI
  if (isError) {
    return <AlertMessage message={error.message} />;
  }

  return (
    <Card className="px-0">
      <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-3">
        <CardTitle>Exchanges</CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">
                #
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Exchange
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Trust Score
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                24H Volume
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching
              ? Array.from({ length: 20 }).map((_, index) => (
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
                ))
              : data?.success
              ? data?.exchanges?.map((exchange, index) => (
                  <TableRow
                    key={index}
                    className={cn(index % 2 !== 0 && 'bg-muted/50')}
                  >
                    <TableCell className="text-muted-foreground">
                      {exchange.trust_score_rank}
                    </TableCell>
                    <TableCell>
                      <Link href={`/exchange/${exchange.id}`} prefetch={false}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Image
                            src={exchange.image}
                            width={24}
                            height={24}
                            alt={exchange.name}
                            className="w-6 h-6"
                          />
                          <span className="truncate">{exchange.name}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <TrustScore
                        score={exchange.trust_score}
                        className="w-12"
                      />
                    </TableCell>
                    <TableCell>
                      <InfoTooltip
                        side="bottom"
                        content={formatCurrency({
                          amount: exchange.trade_volume_24h_btc,
                          compact: true,
                        })}
                      >
                        <div className="flex justify-end cursor-pointer">
                          {formatCurrency({
                            amount: exchange.trade_volume_24h_btc,
                          })}
                        </div>
                      </InfoTooltip>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center gap-4 px-3">
          <Button
            size="icon"
            className="cursor-pointer"
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
          >
            <ChevronsLeft />
          </Button>
          <Button
            size="icon"
            className="cursor-pointer"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm">Page {page}</span>
          <Button
            size="icon"
            className="cursor-pointer"
            disabled={page >= LIMIT}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            className="cursor-pointer"
            disabled={page === LIMIT}
            onClick={() => handlePageChange(LIMIT)}
          >
            <ChevronsRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
