import Link from "next/link";

import AuthButton from "../AuthButton";

import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.actionsContainer}>
        <Link href="/home">Home</Link>
        <Link href="/home/new">Nuevo prestamo</Link>
      </div>
      <div>
        {/* Avatar / user */}
        <AuthButton />
      </div>
    </nav>
  )
}
