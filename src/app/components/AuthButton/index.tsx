'use client'

import { useState, useRef } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import Link from "next/link";

import styles from "./styles.module.css";

export default function AuthButton() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <div className={styles.authButtonContainer} ref={menuRef}>
      {user && user.picture &&
        <Image className={styles.avatar} onClick={() => setIsMenuOpen(!isMenuOpen)} src={user.picture} alt={user?.name || ''} width={20} height={20} />
      }
      {isMenuOpen && <div className={styles.userMenuContainer}>
        <Link href="/api/auth/logout">Logout</Link>
      </div>}
    </div>
  );
}
