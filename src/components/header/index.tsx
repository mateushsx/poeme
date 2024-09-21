import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.css';

export function Header() {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';

  const handleLogin = () => {
    signIn('google');
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerContent}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>Poeme</h1>
          </Link>

          {session?.user && (
            <Link href="/dashboard" className={styles.dashboardLink}>
              Meus versos
            </Link>
          )}
        </nav>

        {!isLoading && !session && (
          <button onClick={handleLogin} className={styles.button}>
            Entrar
          </button>
        )}

        {!isLoading && session && (
          <button onClick={handleLogout} className={styles.button}>
            Sair
          </button>
        )}
      </section>
    </header>
  );
}
