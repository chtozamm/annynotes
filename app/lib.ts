"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getSession(): Promise<string[]> {
  const token = cookies().get("token")?.value as string
  const userId = cookies().get("user_id")?.value as string
  const verified = cookies().get("verified")?.value as string
  return [token, userId, verified]
}

export async function signout() {
  cookies().set("token", "", { expires: new Date(0) })
  cookies().set("user_id", "", { expires: new Date(0) })
  cookies().set("verified", "", { expires: new Date(0) })
  redirect("/")
}
