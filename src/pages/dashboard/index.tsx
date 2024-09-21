import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import styles from './styles.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poeme | Dashboard</title>
      </Head>

      <main>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
