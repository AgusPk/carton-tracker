import styles from "./styles.module.css";

export default function Layout({ children }:
  Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <main>
      <div className={styles.viewContainer}>
        {children}
      </div>
    </main>
  );
}
