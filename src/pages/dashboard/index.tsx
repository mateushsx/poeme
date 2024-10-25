import {
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Forward, Trash } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';

import { Textarea } from '@/components/textarea';
import { versesCollection } from '@/services/collections';
import { TVerse } from '@/types';

import styles from './styles.module.css';
import Link from 'next/link';

interface IDashboardProps {
  user: {
    email: string;
  };
}

export default function Dashboard({ user }: IDashboardProps) {
  const [verse, setVerse] = useState('');
  const [verses, setVerses] = useState<TVerse[]>([]);
  const [isPublicVerse, setIsPublicVerse] = useState(false);

  const handleChangeVerse = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVerse(event.target.value);
  };

  const handleChangePublicVerse = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublicVerse(event.target.checked);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const docRef = doc(versesCollection);

      await setDoc(docRef, {
        id: docRef.id,
        text: verse,
        isPublic: isPublicVerse,
        user: user.email,
        createdAt: new Date(),
      });

      setVerse('');
      setIsPublicVerse(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (id: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_URL;

    try {
      await navigator.clipboard.writeText(`${BASE_URL}/verse/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getVerses() {
      const versesQuery = query(
        versesCollection,
        orderBy('createdAt', 'asc'),
        where('user', '==', user.email)
      );

      onSnapshot(versesQuery, (snapshot) => {
        const verses = snapshot.docs.map((doc) => doc.data()) as TVerse[];

        setVerses(verses);
        console.log(verses);
      });
    }

    getVerses();
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Poeme | Dashboard</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual verso deseja anotar?</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Textarea
                placeholder="Escreva seu verso..."
                value={verse}
                onChange={handleChangeVerse}
              />

              <div className={styles.checkboxContent}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isPublicVerse}
                  onChange={handleChangePublicVerse}
                />

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
            {verses.map((verse) => (
              <article className={styles.card} key={verse.id}>
                <div className={styles.cardLeft}>
                  {verse.isPublic ? (
                    <Fragment>
                      <div className={styles.tagContainer}>
                        <label className={styles.tag}>PÚBLICO</label>

                        <button
                          className={styles.shareButton}
                          onClick={() => handleShare(verse.id)}
                        >
                          <Forward color="#0084ff" strokeWidth={3} />
                        </button>
                      </div>

                      <Link href={`/verse/${verse.id}`} className={styles.link}>
                        <p className={styles.paragraph}>{verse.text}</p>
                      </Link>
                    </Fragment>
                  ) : (
                    <p className={styles.paragraph}>{verse.text}</p>
                  )}
                </div>

                <div className={styles.cardRight}>
                  <button className={styles.buttonDelete}>
                    <Trash strokeWidth={2} size={32} />
                  </button>
                </div>
              </article>
            ))}
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
    props: {
      user: {
        email: session.user?.email,
      },
    },
  };
};
