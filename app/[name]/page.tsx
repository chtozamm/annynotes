import BackButton from "../BackButton";
import Posts from "./Posts";
import { getSenderPosts } from "@/app/utils";

export default async function senderPosts({
  params,
}: {
  params: { name: string };
}) {
  const posts = await getSenderPosts(params.name.replaceAll("_", " "));
  return (
    <>
      <BackButton />
      <Posts posts={posts} />
    </>
  );
}
