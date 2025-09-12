'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

// Icons
import {
  SquareArrowOutUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

// Types
import { Ticker } from '@/types/exchange';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency, formatDate } from '@/lib/formatter';

// UI
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

type Props = {
  data: Ticker[];
  isFetching?: boolean;
};

export function ExchangeTickers({ data, isFetching = false }: Props) {
  const RECORDS_PER_PAGE = 25;
  const totalPages = Math.ceil((data?.length || 0) / RECORDS_PER_PAGE);

  // Local State
  const [page, setPage] = useState(1);

  // Slice data for current page
  const paginatedData = useMemo(() => {
    return data?.slice((page - 1) * RECORDS_PER_PAGE, page * RECORDS_PER_PAGE);
  }, [data, page]);

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Card className="px-1.5 col-span-2">
      <CardHeader className="flex items-center">
        <CardTitle>Tickers</CardTitle>
      </CardHeader>
      <CardContent className="px-3 flex flex-col gap-4">
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">
                Pair
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                24H Volume
              </TableHead>
              <TableHead className="text-center text-muted-foreground font-semibold">
                Trust Score
              </TableHead>
              <TableHead className="text-center text-muted-foreground font-semibold">
                Last Traded
              </TableHead>
              <TableHead className="text-center text-muted-foreground font-semibold">
                Last Updated
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
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : paginatedData?.map((ticker, index) => (
                  <TableRow
                    key={index}
                    className={cn(index % 2 !== 0 && 'bg-muted/50')}
                  >
                    <TableCell>
                      <Link
                        href={ticker.trade_url}
                        target="_blank"
                        prefetch={false}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <SquareArrowOutUpRight className="icon-md stroke-muted-foreground" />
                          <span>
                            {ticker.base}/{ticker.target}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end cursor-pointer">
                        {formatCurrency({
                          amount: ticker.converted_volume.usd,
                          compact: false,
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <div
                          className={cn(
                            'w-3 h-3 rounded-full',
                            ticker.trust_score === 'green'
                              ? 'bg-primary'
                              : 'bg-muted-foreground'
                          )}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center cursor-pointer text-sm">
                        {formatDate({
                          type: 'full-date-time',
                          date: ticker.last_traded_at,
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center cursor-pointer text-sm">
                        {formatDate({
                          type: 'full-date-time',
                          date: ticker.last_fetch_at,
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center gap-4">
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
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            className="cursor-pointer"
            disabled={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <ChevronsRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
