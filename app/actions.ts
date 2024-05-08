"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./lib";
import { cookies } from "next/headers";

function setCookie(key: string, value: string) {
  const expiration = 2 * 24 * 60 * 60 * 1000; // 2 days
  cookies().set(key, value, {
    httpOnly: true,
    expires: Date.now() + expiration,
  });
}

export async function createPost(post: Post): Promise<ResponseError> {
  const [token, _, __] = await getSession();
  if (!token) return "Unauthenticated";
  if (!post.author) {
    post.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json());
  if (authRefreshResponse.ok) {
    setCookie("token", authRefreshResponse.token);
  }
  if (res.ok) {
    revalidateTag("posts");
    const post = await res.json();
    redirect("/posts/" + post.id);
  } else {
    return "Failed to create a post";
  }
}

export async function deletePost(id: string): Promise<ResponseError> {
  const [token, userId, _] = await getSession();
  if (!token || !userId) return "Unauthenticated";
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
  });
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json());
  if (authRefreshResponse.ok) {
    setCookie("token", authRefreshResponse.token);
  }
  if (res.ok) {
    revalidateTag("posts");
    redirect("/");
  } else {
    return "Failed to delete a post";
  }
}

export async function updatePost(post: Post): Promise<ResponseError> {
  const [token, userId, _] = await getSession();
  if (!token || !userId) return "Unauthenticated";
  if (!post.author) {
    post.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + post.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "X-UserID": userId,
    },
    body: JSON.stringify(post),
  });
  const authRefreshResponse = await fetch(
    process.env.NEXT_PUBLIC_AUTH_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json());
  if (authRefreshResponse.ok) {
    setCookie("token", authRefreshResponse.token);
  }
  if (res.ok) {
    revalidateTag("posts");
    redirect("/");
  } else {
    return "Failed to update a post";
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
  );
  if (res.ok) {
    const signInRes = await signIn({
      identity: credentials.email,
      password: credentials.password,
    });
    try {
      setCookie("token", signInRes.token);
      setCookie("user_id", signInRes.record.id);
      setCookie("verified", signInRes.record.verified);
    } finally {
      revalidateTag("user");
      redirect("/");
    }
  } else {
    const err = await res.json();
    return err.message;
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
  ).then((res) => res.json());
  if (res.record) {
    try {
      setCookie("token", res.token);
      setCookie("user_id", res.record.id);
      setCookie("verified", res.record.verified);
    } finally {
      revalidateTag("user");
      redirect("/");
    }
  } else {
    return res.message;
  }
}

// export async function updateUser(
//   credentials: UpdateUser,
// ): Promise<ResponseError> {
//   const [token, _, __] = await getSession()
//   const res = await fetch(
//     (process.env.NEXT_PUBLIC_AUTH_URL + "/records/" + credentials.id) as string,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(credentials),
//     },
//   )
//   const authRefreshResponse = await fetch(
//     process.env.NEXT_PUBLIC_AUTH_URL as string,
//     {
//       method: "POST",
//       headers: {
//         Authorization: token,
//       },
//     },
//   ).then((res) => res.json())
//   if (authRefreshResponse.ok) {
//     setCookie("token", authRefreshResponse.token)
//   }
//   if (res.ok) {
//     revalidateTag("user")
//     redirect("/")
//   } else {
//     const err = await res.json()
//     return err.message
//   }
// }
