import styles from "./posts.module.css";
import SinglePost from "./Post";
import { Post } from "./types";

export default function Posts({ posts }: any) {
  // Get quantity of posts
  let n = posts.length + 1;

  return (
    <>
      <ul className={styles.list}>
        {posts.map((post: Post) => {
          n--;
          return (
            <li key={post.id} className={styles.card}>
              <SinglePost post={post} n={n} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
