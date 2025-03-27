"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import styles from "./styles.module.css"

export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`${styles.navContainer} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/home" className={styles.logo}>
        Carton Tracker
      </Link>

      <div className={styles.actionsContainer}>
        <Link href="/home" className={`${styles.navLink} ${isActive("/home") ? styles.active : ""}`}>
          Inicio
        </Link>
        <Link href="/home/new" className={`${styles.navLink} ${isActive("/home/new") ? styles.active : ""}`}>
          Nuevo Préstamo
        </Link>

        {user && (
          <div className={styles.userSection}>
            <img src={user.picture || ""} alt={user.name || "User"} className={styles.userAvatar} />
            <span className={styles.userName}>{user.name}</span>
          </div>
        )}
      </div>
    </nav>
  )
}

