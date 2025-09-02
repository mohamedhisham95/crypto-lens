'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const LOCAL_STORAGE_KEY = 'disclaimer_accepted';

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const hasAccepted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Disclaimer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This website is a <strong>personal hobby project</strong> built for
            learning and exploring financial APIs.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              All cryptocurrency data is fetched from{' '}
              <a
                href="https://www.coingecko.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                CoinGecko
              </a>
              .
            </li>
            <li>
              Prices and market information{' '}
              <strong>may not be real-time</strong> due to free API limits.
            </li>
            <li>
              The information provided is{' '}
              <strong>for educational purposes only</strong> and{' '}
              <strong>is not financial advice</strong>.
            </li>
            <li>
              Please do your own research before making any investment
              decisions.
            </li>
          </ul>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline">
            <Link href="/disclaimer" className="text-sm text-muted-foreground">
              Read Full Disclaimer
            </Link>
          </Button>
          <Button onClick={handleAccept} className="font-medium">
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
