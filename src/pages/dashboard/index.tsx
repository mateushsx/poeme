import { Forward, Trash } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import { Textarea } from '@/components/textarea';

import styles from './styles.module.css';

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

        <section className={styles.contentBottom}>
          <h1 className={styles.title}>Versos anotados</h1>

          <div className={styles.contentList}>
            <article className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PÚBLICO</label>

                  <button className={styles.shareButton}>
                    <Forward color="#0084ff" strokeWidth={3} />
                  </button>
                </div>

                <p className={styles.paragraph}>
                  Seria mais fácil eu terminar de contar as estrelas do céu do
                  que tentar quantificar o meu amor por você.
                </p>
              </div>

              <div className={styles.cardRight}>
                <button className={styles.buttonDelete}>
                  <Trash strokeWidth={2} size={32} />
                </button>
              </div>
            </article>
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
