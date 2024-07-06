"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { logErrorWithTimestamp } from "@/lib/utils";
// import { getSession } from "./lib";

function setCookie(key: string, value: string) {
  const expiration = 2 * 24 * 60 * 60 * 1000; // 2 days
  cookies().set(key, value, {
    httpOnly: true,
    expires: Date.now() + expiration,
  });
}

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await fetch(
      `${process.env.DB_URL}?sort=-created&perPage=1000`,
      { next: { tags: ["notes"] } },
    );
    if (response.ok) {
      const notes = await response.json();
      return notes;
    } else {
      throw new Error("Failed to fetch notes");
    }
  } catch (err) {
    logErrorWithTimestamp("Failed to fetch notes: " + err);
    return [];
  }
}

export async function createNote(note: Note): Promise<ResponseError> {
  // const p = await new Promise((res, rej) => {
  //   setTimeout(res, 1000);
  // });
  // redirect("/");

  // const [token, _, __] = await getSession();
  // if (!token) return "Unauthenticated";
  if (!note.author) {
    note.author = "stranger";
  }
  const res = await fetch((process.env.DB_URL as string) + "notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token,
    },
    body: JSON.stringify(note),
  });
  // const authRefreshResponse = await fetch(
  //   process.env.NEXT_PUBLIC_AUTH_URL as string,
  //   {
  //     method: "POST",
  //     // headers: {
  //     //   Authorization: token,
  //     // },
  //   },
  // ).then((res) => res.json());
  // if (authRefreshResponse.ok) {
  //   setCookie("token", authRefreshResponse.token);
  // }
  if (res.ok) {
    revalidateTag("notes");
    const note = await res.json();
    redirect("/notes/" + note.id);
  } else {
    return "Failed to create a note";
  }
}

export async function deleteNote(id: string): Promise<ResponseError> {
  // const [token, userId, _] = await getSession();
  // if (!token || !userId) return "Unauthenticated";
  const res = await fetch(process.env.DB_URL + "notes/" + id, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: token,
    //   "X-UserID": userId,
    // },
    body: JSON.stringify({
      id: id,
    }),
  });
  // const authRefreshResponse = await fetch(
  //   process.env.NEXT_PUBLIC_AUTH_URL as string,
  //   {
  //     method: "DELETE",
  //     // headers: {
  //     //   Authorization: token,
  //     // },
  //   },
  // ).then((res) => res.json());
  // if (authRefreshResponse.ok) {
  //   setCookie("token", authRefreshResponse.token);
  // }
  if (res.ok) {
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to delete a note";
  }
}

export async function updateNote(note: Note): Promise<ResponseError> {
  // const [token, userId, _] = await getSession();
  // if (!token || !userId) return "Unauthenticated";
  if (!note.author) {
    note.author = "stranger";
  }
  const res = await fetch(process.env.DB_URL + "notes/" + note.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token,
      // "X-UserID": userId,
    },
    body: JSON.stringify(note),
  });
  // const authRefreshResponse = await fetch(
  //   process.env.NEXT_PUBLIC_AUTH_URL as string,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: token,
  //     },
  //   },
  // ).then((res) => res.json());
  // if (authRefreshResponse.ok) {
  //   setCookie("token", authRefreshResponse.token);
  // }
  if (res.ok) {
    revalidateTag("notes");
    redirect("/");
  } else {
    return "Failed to update a note";
  }
}

// export async function signUp(
//   credentials: SignUpCredentials,
// ): Promise<ResponseError> {
//   const res = await fetch(
//     (process.env.NEXT_PUBLIC_AUTH_URL + "/records") as string,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     },
//   );
//   if (res.ok) {
//     const signInRes = await signIn({
//       identity: credentials.email,
//       password: credentials.password,
//     });
//     try {
//       setCookie("token", signInRes.token);
//       setCookie("user_id", signInRes.record.id);
//       setCookie("verified", signInRes.record.verified);
//     } finally {
//       revalidateTag("user");
//       redirect("/");
//     }
//   } else {
//     const err = await res.json();
//     return err.message;
//   }
// }

// export async function signIn({ identity, password }: SignInCredentials) {
//   const res = await fetch(
//     (process.env.NEXT_PUBLIC_AUTH_URL + "/auth-with-password") as string,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ identity: identity, password: password }),
//     },
//   ).then((res) => res.json());
//   if (res.record) {
//     try {
//       setCookie("token", res.token);
//       setCookie("user_id", res.record.id);
//       setCookie("verified", res.record.verified);
//     } finally {
//       revalidateTag("user");
//       redirect("/");
//     }
//   } else {
//     return res.message;
//   }
// }

// export async function updateUser(
//   credentials: UpdateUser,
// ): Promise<ResponseError> {
// const [token, _, __] = await getSession();
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
