import Link from 'next/link';

// Lib
import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata('disclaimer');

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Disclaimer</h1>

      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <section>
          <p>
            This website is a <strong>personal hobby project</strong> built for{' '}
            <span className="font-medium">
              learning, experimentation, and exploring financial APIs
            </span>
            . It is not affiliated with any financial institution, exchange, or
            trading platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Data Source</h2>
          <p>
            All cryptocurrency prices, charts, and market data are fetched from{' '}
            <a
              href="https://www.coingecko.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              CoinGecko
            </a>
            . While we strive to keep the information up-to-date, we rely
            entirely on third-party data providers, and we cannot guarantee the
            accuracy or completeness of the data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Real-Time Data Disclaimer
          </h2>
          <p>
            Please note that due to API limitations, the data shown on this site{' '}
            <strong>may not always be in real-time</strong>. Delays, rate
            limits, and temporary outages can occur, which may result in
            slightly outdated market information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Not Financial Advice</h2>
          <p>
            The content provided on this site is{' '}
            <strong>for informational and educational purposes only</strong>. It
            does not constitute financial advice, investment recommendations, or
            trading strategies. Please consult with a qualified financial
            advisor before making any investment or trading decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Liability</h2>
          <p>
            Under no circumstances shall the creator of this website be held
            responsible for any losses, damages, or decisions made based on the
            information presented here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Acknowledgment</h2>
          <p>
            By using this website, you acknowledge and agree to the terms of
            this disclaimer.
          </p>
        </section>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </main>
  );
}
