import Posts from "@/components/Posts"
import { createPost, deletePost, updatePost } from "@/utils/pocketbase"

export default async function Home() {
  return (
    <>
      <p className="description">
        Share a legend or leave a note for a loved one
      </p>

      <Posts
        createPost={createPost}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    </>
  )
}
