import { deletePost, updatePost, getPost } from "@/pocketbase";
import Post from "./Post";
import Form from "./Form";
import BackButton from "@/app/BackButton";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (post) {
    return (
      <>
        <BackButton />
        <Post post={post} />
        <Form post={post} updatePost={updatePost} deletePost={deletePost} />
      </>
    );
  } else {
    return redirect("/");
  }
}
