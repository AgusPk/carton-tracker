import Navbar from "../components/Navbar";

import styles from "./home.module.css";

export default function Layout({ children }:
  Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <main>
      <Navbar />
      <div className={styles.viewContainer}>
        {children}
      </div>
    </main>
  );
}
