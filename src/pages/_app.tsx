import { Header } from '@/components/header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />;
    </Fragment>
  );
}
