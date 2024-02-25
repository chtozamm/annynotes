"use server"

import { cookies } from "next/headers";

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return session;
}

export async function getUserId() {
  const userId = cookies().get("user_id")?.value;
  if (!userId) return null;
  return userId;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  cookies().set("token", "", { expires: new Date(0) });
  cookies().set("user_id", "", { expires: new Date(0) });
}
