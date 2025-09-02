'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Icons
import { X } from 'lucide-react';

const BANNER_KEY = 'banner_dismissed';

export function DataNoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 text-sm px-4 py-2 flex items-center justify-between shadow-sm rounded-l-lg">
      <p>
        ⚠️ Market data is provided by{' '}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          CoinGecko
        </a>{' '}
        and may be delayed.{' '}
        <Link href="/disclaimer" className="underline">
          Learn More
        </Link>
      </p>
      <button onClick={handleDismiss} className="ml-2 hover:opacity-70">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
