import Form from "./Form";
import Posts from "./Posts";
import { createPost, getPosts } from "./utils";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <p className="description">
        here you can share a legend or
        <br />
        leave a note for a loved one
      </p>
      <Form createPost={createPost} getPosts={getPosts} />
      <Posts posts={posts} />
    </>
  );
}
