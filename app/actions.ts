"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSession, getUserId } from "./lib"

const month = 30 * 24 * 60 * 60 * 1000

export async function createPost(post: Post) {
  const token = await getSession()
  const userId = await getUserId()
  if (!token || !userId) return
  if (!post.author) {
    post.author = "stranger"
  }
  post.user_id = userId
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  if (res.ok) {
    revalidateTag("posts")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function deletePost(id: string) {
  const token = await getSession()
  const userId = await getUserId()
  if (!token || !userId) return
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
    revalidateTag("posts")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function updatePost(post: Post) {
  const token = await getSession()
  const userId = await getUserId()
  if (!token || !userId) return
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
    revalidateTag("posts")
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
    try {
      cookies().set("session", signInRes.token, {
        httpOnly: true,
        expires: Date.now() + month,
      })
      cookies().set("user_id", signInRes.record.id, {
        httpOnly: true,
        expires: Date.now() + month,
      })
    } finally {
      redirect("/posts/new")
    }
    // revalidateTag("posts")
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
    try {
      cookies().set("session", res.token)
      cookies().set("user_id", res.record.id, {
        httpOnly: true,
        expires: Date.now() + month,
      })
    } finally {
      redirect("/posts/new")
    }
    // revalidateTag("posts")
  } else {
    return res.message
  }
}
