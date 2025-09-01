import React from 'react';

export function CandlestickChartSkeleton() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 115 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="greenCandle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00bc7d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00bc7d" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="redCandle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9245a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f9245a" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Candlestick bars */}
      <g className="animate-pulse">
        {/* Uptrend start */}
        <rect
          x="0"
          y="55"
          width="5"
          height="25"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="10"
          y="50"
          width="5"
          height="30"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="20"
          y="45"
          width="5"
          height="35"
          fill="url(#greenCandle)"
          rx="1"
        />

        {/* Slight downtrend */}
        <rect
          x="30"
          y="48"
          width="5"
          height="32"
          fill="url(#redCandle)"
          rx="1"
        />
        <rect
          x="40"
          y="52"
          width="5"
          height="28"
          fill="url(#redCandle)"
          rx="1"
        />

        {/* Resume uptrend */}
        <rect
          x="50"
          y="40"
          width="5"
          height="40"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="60"
          y="35"
          width="5"
          height="45"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="70"
          y="30"
          width="5"
          height="50"
          fill="url(#greenCandle)"
          rx="1"
        />

        {/* Small pause / sideways */}
        <rect
          x="80"
          y="34"
          width="5"
          height="46"
          fill="url(#redCandle)"
          rx="1"
        />

        {/* Final uptrend */}
        <rect
          x="90"
          y="28"
          width="5"
          height="52"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="100"
          y="24"
          width="5"
          height="56"
          fill="url(#greenCandle)"
          rx="1"
        />
        <rect
          x="110"
          y="20"
          width="5"
          height="60"
          fill="url(#greenCandle)"
          rx="1"
        />
      </g>

      {/* Wick lines */}
      <g className="animate-pulse">
        <line
          x1="2.5"
          y1="50"
          x2="2.5"
          y2="85"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="12.5"
          y1="45"
          x2="12.5"
          y2="85"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="22.5"
          y1="40"
          x2="22.5"
          y2="85"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />

        <line
          x1="32.5"
          y1="44"
          x2="32.5"
          y2="80"
          stroke="#f9245a"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="42.5"
          y1="48"
          x2="42.5"
          y2="78"
          stroke="#f9245a"
          strokeWidth="1"
          opacity="0.6"
        />

        <line
          x1="52.5"
          y1="35"
          x2="52.5"
          y2="85"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="62.5"
          y1="30"
          x2="62.5"
          y2="82"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="72.5"
          y1="25"
          x2="72.5"
          y2="82"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />

        <line
          x1="82.5"
          y1="30"
          x2="82.5"
          y2="78"
          stroke="#f9245a"
          strokeWidth="1"
          opacity="0.6"
        />

        <line
          x1="92.5"
          y1="24"
          x2="92.5"
          y2="82"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="102.5"
          y1="20"
          x2="102.5"
          y2="80"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="112.5"
          y1="15"
          x2="112.5"
          y2="80"
          stroke="#00bc7d"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
