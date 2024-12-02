import Link from "next/link";
import styles from "./navbar.module.css";
import AuthButton from "../AuthButton";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.actionsContainer}>
        <button>Nuevo prestamo</button>
        <Link href="#">Mis prestamos</Link>
        <Link href="#">Lo que preste</Link>
      </div>
      <div>
        {/* Avatar / user */}
        <AuthButton />
      </div>
    </nav>
  )
}
