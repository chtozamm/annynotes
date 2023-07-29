import { deletePost, editPost, getPost } from "@/app/utils";
import Post from "./Post";
import Form from "./Form";
import BackButton from "@/app/BackButton";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: number } }) {
  const post = await getPost(Number(params.id));
  if (post) {
    return (
      <>
        <BackButton />
        <Post post={post} />
        <Form post={post} editPost={editPost} deletePost={deletePost} />
      </>
    );
  } else {
    return redirect("/");
  }
}
