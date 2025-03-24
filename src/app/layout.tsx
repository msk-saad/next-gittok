'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import Head from 'next/head';  // Make sure to import next/head if needed

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <Head>
          <title>GitTok</title>
        </Head>
        <body>


          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
