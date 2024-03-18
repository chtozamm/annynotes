"use server"

import { cookies } from "next/headers";

export async function getSession(): Promise<string[]> {
  const token = cookies().get("session_token")?.value as string;
  const userId = cookies().get("user_id")?.value as string;
  return [token, userId]
}

export async function logout() {
  cookies().set("session_token", "", { expires: new Date(0) });
  cookies().set("user_id", "", { expires: new Date(0) });
}
