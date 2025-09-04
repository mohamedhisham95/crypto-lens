'use client';

import { useState } from 'react';
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

// Actions
import { getCoins, getSupportedCurrencies } from '@/actions';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';

// Types
import type { CoinsResponse } from '@/types/coins';
import type { SupportedCurrenciesResponse } from '@/types/currencies';

// Components
import { AlertMessage, Percentage, TooltipWrapper } from '@/components/common';

// UI
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const order_by_list = [
  {
    label: 'Market Cap ASC',
    value: 'market_cap_asc',
  },
  {
    label: 'Market Cap DESC',
    value: 'market_cap_desc',
  },
  {
    label: 'Volume ASC',
    value: 'volume_asc',
  },
  {
    label: 'Volume DESC',
    value: 'volume_desc',
  },
  {
    label: 'ID ASC',
    value: 'id_asc',
  },
  {
    label: 'ID DESC',
    value: 'id_desc',
  },
];

export function CoinsTemplate() {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();

  const LIMIT = 40; // 40 * 20 = 800 Records Of Coins

  const page = Number(searchParams.get('page')) || 1;

  // Local State
  const [currency, setCurrency] = useState('usd');
  const [order, setOrder] = useState('market_cap_desc');

  // Coins
  const { data, isFetching } = useQuery<CoinsResponse>({
    queryKey: ['coins', page, order, currency],
    queryFn: () =>
      getCoins({
        vs_currency: currency,
        page: Number(searchParams.get('page')) || 1,
        order,
        price_change_percentage: ['1h', '24h', '7d'],
      }),
  });

  // Supported Currencies
  const {
    data: supportedCurrenciesData,
    isFetching: isSupportedCurrenciesFetching,
  } = useQuery<SupportedCurrenciesResponse>({
    queryKey: ['supported_currencies'],
    queryFn: () => getSupportedCurrencies(),
  });

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  // Handle Order By
  const handleOrderBy = (orderBy: string) => {
    setOrder(orderBy);
    handlePageChange(1);
  };

  // Handle Currency
  const handleCurrency = (currency: string) => {
    setCurrency(currency);
    handlePageChange(1);
  };

  // Error UI
  if (data && !data.success) {
    return <AlertMessage message={data.message} />;
  }

  return (
    <Card className="px-1.5">
      <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <CardTitle>Coins</CardTitle>
        <CardAction>
          <div className="flex items-center gap-4">
            <Select value={order} onValueChange={handleOrderBy}>
              <SelectTrigger className="w-full" size="sm">
                <SelectValue placeholder="Coin" />
              </SelectTrigger>
              <SelectContent>
                {order_by_list.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isSupportedCurrenciesFetching && !supportedCurrenciesData ? (
              <Skeleton className="h-4 w-16" />
            ) : supportedCurrenciesData && !supportedCurrenciesData.success ? (
              <AlertMessage message={supportedCurrenciesData.message} />
            ) : supportedCurrenciesData ? (
              <Select value={currency} onValueChange={handleCurrency}>
                <SelectTrigger className="w-[80px]" size="sm">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {supportedCurrenciesData?.supported_currencies.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-3 flex flex-col gap-4">
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">
                #
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Coin
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Symbol
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                Price
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                1H
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                24H
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                7D
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">
                Market Cap
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
                      <Skeleton className="h-4 w-16" />
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
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : data
              ? data.coins?.map((coin, index) => (
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
                      <Badge variant="secondary" className="uppercase">
                        {coin?.symbol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipWrapper
                        side="bottom"
                        content={formatCurrency({
                          amount: coin.current_price,
                          compact: true,
                          currency: currency,
                        })}
                      >
                        <div className="flex justify-end cursor-pointer">
                          {formatCurrency({
                            amount: coin.current_price,
                            currency: currency,
                          })}
                        </div>
                      </TooltipWrapper>
                    </TableCell>
                    <TableCell>
                      <Percentage
                        value={coin.price_change_percentage_1h_in_currency}
                        decimals={3}
                      />
                    </TableCell>
                    <TableCell>
                      <Percentage
                        value={coin.price_change_percentage_24h_in_currency}
                        decimals={3}
                      />
                    </TableCell>
                    <TableCell>
                      <Percentage
                        value={coin.price_change_percentage_7d_in_currency}
                        decimals={3}
                      />
                    </TableCell>
                    <TableCell>
                      <TooltipWrapper
                        side="bottom"
                        content={formatCurrency({
                          amount: coin.market_cap,
                          compact: true,
                          currency: currency,
                        })}
                      >
                        <div className="flex justify-end cursor-pointer">
                          {formatCurrency({
                            amount: coin.market_cap,
                            currency: currency,
                          })}
                        </div>
                      </TooltipWrapper>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
          >
            <ChevronsLeft />
          </Button>
          <Button
            size="icon"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            disabled={page >= LIMIT}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            size="icon"
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
