import { cookies } from 'next/headers';
import styles from './page.module.css';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("appSession");

  if (isLoggedIn) {
    redirect("/home");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/api/auth/login" className={styles.secondary}>
          Login
        </Link>
      </main>
    </div>
  );
}
