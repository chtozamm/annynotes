import { deletePost, updatePost } from "@/utils/pocketbase"
import Post from "./Post"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Post
        id={params.id}
        updatePost={updatePost}
        deletePost={deletePost}
      />
    </>
  )
}
