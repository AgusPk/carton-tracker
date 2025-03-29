"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import styles from "./styles.module.css"

export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    // Get the current origin for the returnTo URL
    const returnTo = typeof window !== 'undefined' ? window.location.origin : ''
    // Construct the logout URL with returnTo and federated parameters
    window.location.href = `/api/auth/logout?returnTo=${encodeURIComponent(returnTo)}&federated`
  }

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
          <div className={styles.userMenuContainer} ref={menuRef}>
            <button 
              className={styles.userSection} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open user menu"
            >
              <img src={user.picture || ""} alt={user.name || "User"} className={styles.userAvatar} />
              <span className={styles.userName}>{user.name}</span>
            </button>
            
            {isMenuOpen && (
              <div className={styles.userMenu}>
                <button onClick={handleLogout} className={styles.menuItem}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

