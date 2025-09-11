'use client';

import { useQuery } from '@tanstack/react-query';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Types
import { ExchangeInfo, ExchangeResponse } from '@/types/exchange';

// Components
import { AlertMessage } from '@/components/common';
import { Information, Values } from '@/components/exchange';

type Props = {
  exchangeId: string;
  initialData: ExchangeResponse;
};

export function ExchangeTemplate({ exchangeId, initialData }: Props) {
  // Exchange Data
  const {
    data: exchangeData,
    isFetching,
    error,
    isError,
  } = useQuery<ExchangeResponse>({
    initialData: initialData,
    queryKey: ['exchange_data', exchangeId],
    queryFn: () => apiFetcher(`/exchange/${exchangeId}`),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Exchange Information */}
        {isFetching && !exchangeData && (
          <Information data={{} as ExchangeInfo} isFetching={true} />
        )}

        {!isFetching &&
          (isError || (exchangeData && !exchangeData.success)) && (
            <AlertMessage
              message={
                !exchangeData?.success
                  ? exchangeData?.message
                  : (error as Error)?.message || 'An error occurred.'
              }
            />
          )}

        {!isFetching && exchangeData && exchangeData.success && (
          <Information
            data={exchangeData.exchange_info}
            isFetching={isFetching}
          />
        )}

        {/* Exchange Values */}
        {isFetching && !exchangeData && (
          <Values data={{} as ExchangeInfo} isFetching={true} />
        )}

        {!isFetching &&
          (isError || (exchangeData && !exchangeData.success)) && (
            <AlertMessage
              message={
                !exchangeData?.success
                  ? exchangeData?.message
                  : (error as Error)?.message || 'An error occurred.'
              }
            />
          )}

        {!isFetching && exchangeData && exchangeData.success && (
          <Values data={exchangeData.exchange_info} isFetching={isFetching} />
        )}

        {/* Tickers */}
      </div>
    </div>
  );
}
