'use client';

import { ExchangeResponse } from '@/types/exchange';
import React from 'react';

type Props = {
  exchangeId: string;
  initialData: ExchangeResponse;
};

export function ExchangeTemplate({ exchangeId, initialData }: Props) {
  return <div>exchange-template</div>;
}
