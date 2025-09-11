'use client';

import { useEffect, useState } from 'react';

// Icons
import { TriangleAlert } from 'lucide-react';

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
  // Local State
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
        className="max-w-lg h-96 flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {/* Fixed Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert className="icon-md stroke-yellow-500" />
            <span className="text-xl font-semibold">Disclaimer</span>
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 text-base text-muted-foreground leading-relaxed pr-2">
          <section>
            <p>
              This website is a <strong>personal hobby project</strong> built
              for{' '}
              <span className="font-medium">
                learning, experimentation, and exploring financial APIs
              </span>
              . It is not affiliated with any financial institution, exchange,
              or trading platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Data Source</h2>
            <p>
              All cryptocurrency prices, charts, and market data are fetched
              from{' '}
              <a
                href="https://www.coingecko.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                CoinGecko
              </a>
              . While we strive to keep the information up-to-date, we rely
              entirely on third-party data providers, and we cannot guarantee
              the accuracy or completeness of the data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              Real-Time Data Disclaimer
            </h2>
            <p>
              Please note that due to API limitations, the data shown on this
              site <strong>may not always be in real-time</strong>. Delays, rate
              limits, and temporary outages can occur, which may result in
              slightly outdated market information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Not Financial Advice</h2>
            <p>
              The content provided on this site is{' '}
              <strong>for informational and educational purposes only</strong>.
              It does not constitute financial advice, investment
              recommendations, or trading strategies. Please consult with a
              qualified financial advisor before making any investment or
              trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Liability</h2>
            <p>
              Under no circumstances shall the creator of this website be held
              responsible for any losses, damages, or decisions made based on
              the information presented here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Acknowledgment</h2>
            <p>
              By using this website, you acknowledge and agree to the terms of
              this disclaimer.
            </p>
          </section>

          <p className="mt-10 text-xs text-muted-foreground">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="flex justify-between">
          <Button onClick={handleAccept} className="font-medium">
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
