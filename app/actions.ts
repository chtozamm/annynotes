"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Credentials,
  Note,
  ResponseError,
  SignInCredentials,
  SignUpCredentials,
} from "@/app/types";

export async function getSession(): Promise<Credentials> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  const userId = cookieStore.get("user_id")?.value as string;
  return { token: token, user_id: userId };
}

export async function signout() {
  const cookieStore = await cookies();
  cookieStore.set({ name: "token", value: "", expires: new Date(0) });
  cookieStore.set({ name: "user_id", value: "", expires: new Date(0) });
  redirect("/");
}

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
  const { token } = await getSession();
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
  if (res.ok) {
    revalidateTag("notes");
    const note = await res.json();
    redirect("/notes/" + note.id);
  } else {
    return "Failed to create a note. Try to log in to your account or try again later. 🦉";
  }
}

export async function deleteNote(id: string): Promise<ResponseError> {
  const { token } = await getSession();
  if (!token) return "Unauthenticated";
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res.ok) {
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to delete a note. It seems you may be trying to access someone else's note. Please check your permissions or log in to your account. 🦉";
  }
}

export async function updateNote(note: Note): Promise<ResponseError> {
  const { token } = await getSession();
  if (!token) return "Unauthenticated";
  if (!note.author) {
    note.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + note.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(note),
  });
  if (res.ok) {
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to update a note. It seems you may be trying to access someone else's note. Please check your permissions or log in to your account. 🦉";
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
    } finally {
      revalidateTag("user");
      redirect("/");
    }
  } else {
    return res.message;
  }
}
