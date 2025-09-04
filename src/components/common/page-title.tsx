'use client';

import { usePathname } from 'next/navigation';

const title_data: Record<string, string> = {
  '/': 'Dashboard',
  '/coins': 'Coins',
  '/coin': 'Coin Analysis',
  '/coin-comparison': 'Coin Comparison',
  '/disclaimer': 'Disclaimer',
};

export function PageTitle() {
  const pathname = usePathname();

  function getPageTitle() {
    let title: string = '';
    if (pathname.startsWith('/coin/')) {
      title = title_data['/coin'];
    } else {
      title = title_data[pathname] || 'Page Not Found';
    }

    return title;
  }

  return (
    <div className="flex items-center flex-start">
      <p className="text-muted-foreground text-sm">{getPageTitle()}</p>
    </div>
  );
}
