import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import styles from './styles.module.css';
import { Textarea } from '@/components/textarea';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poeme | Dashboard</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual verso deseja anotar?</h1>

            <form className={styles.form}>
              <Textarea placeholder="Escreva seu verso..." />

              <div className={styles.checkboxContent}>
                <input type="checkbox" className={styles.checkbox} />

                <label>Deixar verso publico?</label>
              </div>

              <button type="submit" className={styles.button}>
                Anotar
              </button>
            </form>
          </div>
        </section>
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
