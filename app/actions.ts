"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const cookieStore = cookies()
const token: string = cookieStore.get("token")?.value || ""
const userId: string = cookieStore.get("user_id")?.value || ""
const month = 30 * 24 * 60 * 60 * 1000

export async function createPost(post: Post) {
  if (!post.author) {
    post.author = "stranger"
  }
  post.user = userId
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  if (res.ok) {
    revalidatePath("/")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function deletePost(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "X-UserID": userId,
    },
    body: JSON.stringify({
      id: id,
    }),
  })
  if (res.ok) {
    revalidatePath("/")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function updatePost(post: Post) {
  if (!post.author) {
    post.author = "stranger"
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + post.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "X-UserID": userId,
    },
    body: JSON.stringify(post),
  })
  if (res.ok) {
    revalidatePath("/")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function signUp(
  credentials: SignUpCredentials,
): Promise<ResponseError> {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_AUTH_URL + "/records") as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  )
  if (res.ok) {
    const signInRes = await signIn({
      identity: credentials.email,
      password: credentials.password,
    })
    cookieStore.set("token", signInRes.token)
    cookieStore.set("user_id", signInRes.record.id, {
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + month,
    })
    revalidatePath("/")
    redirect("/")
  } else {
    const err = await res.json()
    return err.message
  }
}

export async function signIn({ identity, password }: SignInCredentials) {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_AUTH_URL + "/auth-with-password") as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identity: identity, password: password }),
    },
  ).then((res) => res.json())
  if (res.record) {
    cookieStore.set("token", res.token)
    cookieStore.set("user_id", res.record.id, {
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + month,
    })
    revalidatePath("/")
    redirect("/")
  } else {
    return res.message
  }
}
