'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

// Icons
import { Search, X } from 'lucide-react';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';

// Types
import { CoinSearchResponse } from '@/types/coin';

// Actions
import { coinSearch } from '@/actions/coin-analysis';

// UI
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  handleSelectCoinCallback: (coinId: string) => void;
};

export function CoinSearch({ handleSelectCoinCallback }: Props) {
  // Ref for detecting outside clicks
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Local State
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Debounce
  const debouncedQuery = useDebounce(query);

  // Coin Search
  const { data: coinSearchData, isFetching } = useQuery<CoinSearchResponse>({
    queryKey: ['coin_search', debouncedQuery],
    queryFn: () => coinSearch(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  // Handle coin selection → navigate to coin page
  const handleSelectCoin = (coinId: string) => {
    setIsOpen(false);
    setQuery('');
    handleSelectCoinCallback(coinId);
  };

  // UseEffect: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery(''); // clear input
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card className="py-3 justify-center h-14">
      <CardContent className="flex flex-col relative" ref={wrapperRef}>
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 !bg-card !border-0"
          />
          {/* Clear Button */}
          {query && (
            <Button
              variant="ghost"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-7 w-full h-32 z-10">
            <Card className="py-3 shadow-lg rounded-lg border bg-background">
              <CardContent className="flex flex-col max-h-40 overflow-y-auto px-3">
                {isFetching &&
                  Array.from({ length: 5 }, (_, index) => (
                    <div
                      key={index}
                      className="p-1.5 rounded-md transition flex items-center justify-between"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>

                      <Skeleton className="h-4 w-10" />
                    </div>
                  ))}

                {coinSearchData &&
                  coinSearchData.success &&
                  coinSearchData.coins.length > 0 &&
                  coinSearchData.coins?.map((coin, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectCoin(coin.id)}
                      className="p-1.5 rounded-md hover:bg-accent cursor-pointer transition flex items-center justify-between"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="w-10 justify-center"
                        >
                          #{coin.market_cap_rank}
                        </Badge>
                        <Image
                          src={coin.large}
                          width={24}
                          height={24}
                          alt={coin.symbol}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="text-base font-semibold text-ellipsis">
                          {coin.name}
                        </span>
                      </div>

                      <Badge variant="outline" className="uppercase shrink-0">
                        {coin.symbol}
                      </Badge>
                    </div>
                  ))}

                {!isFetching &&
                  coinSearchData &&
                  coinSearchData.success &&
                  coinSearchData.coins.length === 0 && (
                    <div className="p-2 text-muted-foreground text-center">
                      No results found
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
