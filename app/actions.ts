"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib";
import { cookies } from "next/headers";
import {
  Note,
  ResponseError,
  SignInCredentials,
  SignUpCredentials,
} from "./types";

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  const expiration = 2 * 24 * 60 * 60 * 1000; // 2 days
  cookieStore.set({
    name: key,
    value: value,
    httpOnly: true,
    expires: Date.now() + expiration,
  });
}

export async function createNote(note: Note): Promise<ResponseError> {
  const [token, ,] = await getSession();
  if (!token) return "Unauthenticated";
  if (!note.author) {
    note.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(note),
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
    revalidateTag("notes");
    const note = await res.json();
    redirect("/notes/" + note.id);
  } else {
    return "Failed to create a note";
  }
}

export async function deleteNote(id: string): Promise<ResponseError> {
  const [token, userId] = await getSession();
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
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to delete a note";
  }
}

export async function updateNote(note: Note): Promise<ResponseError> {
  const [token, userId] = await getSession();
  if (!token || !userId) return "Unauthenticated";
  if (!note.author) {
    note.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + note.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "X-UserID": userId,
    },
    body: JSON.stringify(note),
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
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to update a note";
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
//   const [token] = await getSession()
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
