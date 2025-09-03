// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { CoinsTemplate } from '@/components/coins';

export const metadata = getMetadata('coins');

export default function CoinsPage() {
  return <CoinsTemplate />;
}
