import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { Header } from '@/components/header';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
