// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { CategoriesTemplate } from '@/components/categories';

export const metadata = getMetadata('top_categories');

export default function TopCategories() {
  return <CategoriesTemplate />;
}
