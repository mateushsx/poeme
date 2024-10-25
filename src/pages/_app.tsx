import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/components/header';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
