'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("appSession");
  redirect("/");
}
