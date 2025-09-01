import React from 'react';

export function AreaChartSkeleton() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8884d8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8884d8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#82ca9d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#82ca9d" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M 0 50 Q 10 45 20 48 T 40 46 T 60 44 T 80 42 T 100 40 L 100 100 L 0 100 Z"
        fill="url(#gradient1)"
        className="animate-pulse"
      />
      <path
        d="M 0 60 Q 10 56 20 58 T 40 56 T 60 54 T 80 52 T 100 50 L 100 100 L 0 100 Z"
        fill="url(#gradient2)"
        className="animate-pulse"
      />
    </svg>
  );
}
