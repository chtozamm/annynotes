import Posts from "./Posts";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getPostByNameAndMessage,
} from "@/app/pocketbase";

export default async function Home() {
  let posts = await getPosts().catch((err) => {
    console.log(err);
    return [];
  });

  return (
    <>
      <Posts
        data={posts}
        getPosts={getPosts}
        createPost={createPost}
        deletePost={deletePost}
        updatePost={updatePost}
        getPostByNameAndMessage={getPostByNameAndMessage}
      />
    </>
  );
}
