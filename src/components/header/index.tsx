import Link from 'next/link';
import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.headerContent}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>Poeme</h1>
          </Link>

          <Link href="/dashboard" className={styles.dashboardLink}>
            Meus versos
          </Link>
        </nav>

        <button className={styles.button}>Entrar</button>
      </section>
    </header>
  );
}
