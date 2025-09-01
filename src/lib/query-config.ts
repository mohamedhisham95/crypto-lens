import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 15 * 60 * 1000, // 15 minutes
      refetchInterval: 0,
    },
  },
});
