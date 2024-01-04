"use server";

export async function createPost(post: Post) {
  if (!post.author) {
    post.author = "stranger";
  }
  const res = await fetch(process.env.NEXT_PUBLIC_DB_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
}

export async function deletePost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${id}` as string, {
    method: "DELETE",
  });
  if (res.status == 204) {
    return true;
  } else {
    return false;
  }
}
