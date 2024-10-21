import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <div>
        <button>Nuevo prestamo</button>
        <a href="#">Mis prestamos</a>
        <a href="#">Lo que preste</a>
      </div>
      <div>
        {/* Avatar / user */}
        <div className={styles.avatar} />
      </div>
    </nav>
  )
}
