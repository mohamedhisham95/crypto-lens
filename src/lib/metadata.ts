import type { Metadata } from 'next';

// Config
import { SEO } from '@/constants/seo';

export function getMetadata(page: keyof typeof SEO): Metadata {
  const { title, description } = SEO[page];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '', // Change later
      siteName: 'Crypto Lens',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: page === 'disclaimer' ? false : true, // Hide disclaimer from search
      follow: true,
    },
  };
}
