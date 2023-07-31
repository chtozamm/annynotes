import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase";
import { Post } from "./types";

export const pb = new PocketBase("https://annynotes.pockethost.io/");

export async function getPosts() {
  "use server";
  const records = await pb.collection("posts").getFullList({
    sort: "-created",
    fields: "id, sender_name, message",
  });
  const data: Post[] = [];
  records.map((record) =>
    data.push({
      id: record.id,
      sender_name: record.sender_name,
      message: record.message,
    })
  );
  revalidatePath("/");
  return data;
}

export async function getPost(id: string) {
  "use server";
  const data = await pb.collection("posts").getOne(id);
  revalidatePath("/");
  return data;
}

export async function getPostByNameAndMessage(
  sender_name: string,
  message: string
) {
  "use server";
  const data = await pb
    .collection("posts")
    .getFirstListItem(`sender_name="${sender_name}" && message="${message}"`);
  revalidatePath("/");
  return data;
}

export async function createPost(
  id: string,
  senderName: string,
  message: string
) {
  "use server";
  senderName === "" ? (senderName = "stranger") : senderName;

  const data = {
    id: id,
    sender_name: senderName,
    message: message,
  };
  await pb.collection("posts").create(data);
  revalidatePath("/");
}

export async function updatePost(
  id: string,
  sender_name: string,
  message: string
) {
  "use server";
  const data = {
    sender_name: sender_name,
    message: message,
  };
  await pb.collection("posts").update(id, data);
  revalidatePath("/");
}

export async function deletePost(id: string) {
  "use server";
  await pb.collection("posts").delete(id);
  revalidatePath("/");
}

export async function getSenderPosts(sender_name: string) {
  "use server";
  let filter;
  if (sender_name.includes("Jack Sparrow")) {
    filter = `sender_name?~"Jack Sparrow"`;
  } else {
    filter = `sender_name="${sender_name}"`;
  }
  const data = await pb.collection("posts").getFullList({
    filter: filter,
    sort: "-created",
  });
  revalidatePath("/");
  return data;
}
