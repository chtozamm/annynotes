"use server";

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
  return res.ok;
}

// export async function deletePost(id: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${id}` as string, {
//     method: "DELETE",
//   });
//   return res.ok;
// }

// export async function updatePost(post: Post) {
//   if (!post.author) {
//     post.author = "stranger";
//   }
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_DB_URL}/${post.id}` as string,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(post),
//     },
//   );
//   return res.ok;
// }
