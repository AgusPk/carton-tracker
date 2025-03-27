import { cookies } from 'next/headers';
import styles from './page.module.css';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("appSession");

  if (isLoggedIn) {
    redirect("/home");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Carton Tracker</h1>
          <p className={styles.subtitle}>Organiza y rastrea tus préstamos de cartas Pokémon de manera sencilla</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Rastreo Simple</h3>
            <p>Mantén un registro claro de tus préstamos y devoluciones</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔔</div>
            <h3>Notificaciones</h3>
            <p>Recibe alertas cuando sea momento de devolver tus cartas</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3>Gestión de Usuarios</h3>
            <p>Administra fácilmente quién te presta y a quién prestas</p>
          </div>
        </div>
        <div className={styles.ctas}>
          <a href="/api/auth/login" className={styles.primary}>
            Comenzar Ahora
          </a>
          <Link href="#features" className={styles.secondary}>
            Conocer Más
          </Link>
        </div>
      </main>
    </div>
  );
}
