'use client'

import Image from "next/image";
import { logout } from "./actions";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuthButton() {
  const { user } = useUser();
  return (
    <>
      {user &&  user.picture && <Image src={user.picture} alt={user?.name || ''} width={20} height={20} />}
      <button onClick={logout}>Logout</button>
    </>
  );
}
