'use client'

import { logout } from "./actions";

export default function AuthButton() {
  return <button onClick={logout}>Logout</button>;
}