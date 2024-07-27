import Head from 'next/head';
import styles from '@/styles/home.module.css';
import Image from 'next/image';
import heroImage from '@/public/assets/hero.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poeme | Compartilhe seus sentimentos em versos</title>
        <meta
          name="description"
          content="Compartilhe seus sentimentos em versos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.heroContent}>
          <Image
            src={heroImage}
            alt="Poeme Hero"
            priority
            className={styles.hero}
          />
        </div>

        <h1 className={styles.title}>
          Sistema feito para você compartilhar <br />
          seus sentimentos em versos
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.boxInfo}>
            <span>+332 versos </span>
          </section>

          <section className={styles.boxInfo}>
            <span>+632 comentários </span>
          </section>
        </div>
      </main>
    </div>
  );
}
