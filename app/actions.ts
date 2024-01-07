"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(post: Post) {
  if (!post.author) {
    post.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (res.ok) {
    revalidatePath("/");
    redirect("/");
  } else {
    return "fail";
  }
}

export async function deletePost(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res.ok) {
    revalidatePath("/");
    redirect("/");
  } else {
    return "fail";
  }
}
