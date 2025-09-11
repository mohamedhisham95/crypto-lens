// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { ExchangesTemplate } from '@/components/exchanges';

export const metadata = getMetadata('exchanges');

export default function ExchangesPage() {
  return <ExchangesTemplate />;
}
