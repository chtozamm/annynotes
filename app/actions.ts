"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSession } from "./lib"

const expiration = 2 * 24 * 60 * 60 * 1000

export async function createPost(post: Post) {
  const [token, _, __] = await getSession()
  if (!token) return
  if (!post.author) {
    post.author = "stranger"
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json())
  if (authRefreshResponse.ok) {
    cookies().set("token", authRefreshResponse.token, {
      httpOnly: true,
      expires: Date.now() + expiration,
    })
  }
  if (res.ok) {
    revalidateTag("posts")
    post.verified ? redirect("/") : redirect("/profile/posts")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function deletePost(id: string) {
  const [token, userId, _] = await getSession()
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
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json())
  if (authRefreshResponse.ok) {
    cookies().set("token", authRefreshResponse.token, {
      httpOnly: true,
      expires: Date.now() + expiration,
    })
  }
  if (res.ok) {
    revalidateTag("posts")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function updatePost(post: Post) {
  const [token, userId, _] = await getSession()
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
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json())
  if (authRefreshResponse.ok) {
    cookies().set("token", authRefreshResponse.token, {
      httpOnly: true,
      expires: Date.now() + expiration,
    })
  }
  if (res.ok) {
    revalidateTag("posts")
    redirect("/")
  } else {
    // TODO: Return proper response
    return "fail"
  }
}

export async function updateUser(
  credentials: UpdateUser,
): Promise<ResponseError> {
  const [token, _, __] = await getSession()
  const res = await fetch(
    (process.env.NEXT_PUBLIC_AUTH_URL + "/records/" + credentials.id) as string,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(credentials),
    },
  )
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json())
  if (authRefreshResponse.ok) {
    cookies().set("token", authRefreshResponse.token, {
      httpOnly: true,
      expires: Date.now() + expiration,
    })
  }
  if (res.ok) {
    // const signInRes = await signIn({
    //   identity: credentials.email,
    //   password: credentials.password,
    // })
    // try {
    //   cookies().set("token", signInRes.token, {
    //     httpOnly: true,
    //     expires: Date.now() + month,
    //   })
    //   cookies().set("user_id", signInRes.record.id, {
    //     httpOnly: true,
    //     expires: Date.now() + month,
    //   })
    //   cookies().set("verified", signInRes.record.verified, {
    //     httpOnly: true,
    //     expires: Date.now() + month,
    //   })
    revalidateTag("user")
    redirect("/profile")
  } else {
    const err = await res.json()
    return err.message
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
      cookies().set("token", signInRes.token, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
      cookies().set("user_id", signInRes.record.id, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
      cookies().set("verified", signInRes.record.verified, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
    } finally {
      revalidateTag("user")
      redirect("/profile")
    }
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
      cookies().set("token", res.token, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
      cookies().set("user_id", res.record.id, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
      cookies().set("verified", res.record.verified, {
        httpOnly: true,
        expires: Date.now() + expiration,
      })
    } finally {
      revalidateTag("user")
      redirect("/profile")
    }
  } else {
    return res.message
  }
}
