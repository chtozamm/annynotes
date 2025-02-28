"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(): Promise<string[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  const userId = cookieStore.get("user_id")?.value as string;
  const verified = cookieStore.get("verified")?.value as string;
  return [token, userId, verified];
}

export async function signout() {
  const cookieStore = await cookies();
  cookieStore.set({ name: "token", value: "", expires: new Date(0) });
  cookieStore.set({ name: "user_id", value: "", expires: new Date(0) });
  cookieStore.set({ name: "verified", value: "", expires: new Date(0) });
  redirect("/");
}
