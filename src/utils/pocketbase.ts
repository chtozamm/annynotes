import PocketBase from "pocketbase"
import { Post } from "@/utils/types"

export const pb = new PocketBase("https://annynotes.pockethost.io/")

export async function getPosts() {
  "use server"
  const records = await pb.collection("posts").getFullList({
    sort: "-created",
    fields: "id, sender_name, message, created",
  })
  const data: Post[] = []
  records.map((record) =>
    data.push({
      id: record.id,
      sender_name: record.sender_name,
      message: record.message,
      created: record.created,
    })
  )
  return data
}

export async function createPost(
  id: string,
  senderName: string,
  message: string
) {
  "use server"
  senderName ? senderName : (senderName = "stranger")

  const data = {
    id: id,
    sender_name: senderName,
    message: message,
    created: Date.now(),
  }
  await pb.collection("posts").create(data)
}

export async function updatePost(
  id: string,
  sender_name: string,
  message: string
) {
  "use server"
  const data = {
    sender_name: sender_name,
    message: message,
  }
  await pb.collection("posts").update(id, data)
}

export async function deletePost(id: string) {
  "use server"
  await pb.collection("posts").delete(id)
}
