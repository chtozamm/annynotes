import BackButton from "../BackButton";
import Posts from "./Posts";
import { getSenderPosts } from "@/pocketbase";

export default async function senderPosts({
  params,
}: {
  params: { sender_name: string };
}) {
  const posts = await getSenderPosts(params.sender_name.replaceAll("_", " "));
  return (
    <>
      <BackButton />
      <Posts posts={posts} />
    </>
  );
}
