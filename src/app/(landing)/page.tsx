'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';

// Icons
import { Coins, GitBranch, Globe, Heart } from 'lucide-react';

// Constants
import { tech_stack } from '@/constants/tech-stack';

// Components
import { InfoTooltip } from '@/components/common';

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col gap-10 items-center justify-center py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="flex items-center gap-3"
        >
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          >
            <Coins className="w-12 h-12 stroke-primary" />
          </motion.div>

          <h1 className="text-3xl xl:text-5xl font-bold text-primary">
            Crypto Lens
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-lg text-gray-300 max-w-xl"
        >
          Your lens into the crypto market.
          <br />
          Track coins, exchanges, and categories with ease.
          <br />
          Beautiful charts, clear insights, seamless experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="z-10"
        >
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-primary hover:bg-primary rounded-xl text-lg font-semibold shadow-md transition-transform hover:scale-105 text-background"
          >
            Explore Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="relative max-w-xl"
        >
          {/* Pulsing gradient glow */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }} // 👈 pulsing scale
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/10 blur-3xl" />
          </motion.div>

          {/* Dashboard image */}
          <Image
            src="/screenshots/dashboard.png"
            alt="dashboard"
            width={1000}
            height={1000}
            className="relative w-full h-full"
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="flex flex-col gap-8 items-center justify-center py-6 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-2xl xl:text-3xl font-semibold mb-6"
        >
          Features
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-left space-y-3 max-w-2xl text-lg text-muted-foreground"
        >
          <li>📊 Dashboard with global market stats, top gainers/losers</li>
          <li>💹 Coin analysis with historical & OHLC charts</li>
          <li>🔍 Compare two coins side by side with charts</li>
          <li>🏦 Exchange insights with tickers & volume trends</li>
          <li>📂 Categories ranked by market cap, volume, or name</li>
        </motion.ul>
      </section>

      {/* TECH STACK */}
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-2xl xl:text-3xl font-semibold mb-6"
        >
          Built With
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center gap-3"
        >
          {tech_stack.map((item, index) => (
            <InfoTooltip key={index} content={item.name}>
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={100}
                className="w-16 h-16 object-contain bg-card p-2 rounded-full"
              />
            </InfoTooltip>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="icon-sm fill-destructive stroke-destructive animate-pulse" />
            <span>by</span>
            <span className="text-primary font-semibold">Mohamed Hisham</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mohamedhisham95/crypto-lens"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl font-semibold flex items-center gap-2 text-sm border border-primary hover:bg-primary hover:text-background transition"
            >
              <GitBranch className="icon-sm" />
              <span>GitHub Repo</span>
            </a>

            <a
              href="https://mohamedhisham95.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl font-semibold flex items-center gap-2 text-sm border border-primary hover:bg-primary hover:text-background transition"
            >
              <Globe className="icon-sm" />
              <span>Portfolio</span>
            </a>
          </div>
          <span className="text-center text-xs text-muted-foreground">
            Data from CoinGecko free API. Not financial advice.
          </span>
        </motion.div>
      </footer>
    </main>
  );
}
