// Actions
import { getExchangeData } from '@/actions';

// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { ExchangeTemplate } from '@/components/exchange';

export const metadata = getMetadata('exchanges');

export default async function ExchangePage({
  params,
}: {
  params: { exchange_id: string };
}) {
  const { exchange_id } = await params;

  const exchangeData = await getExchangeData(exchange_id);

  return (
    <ExchangeTemplate exchangeId={exchange_id} initialData={exchangeData} />
  );
}
