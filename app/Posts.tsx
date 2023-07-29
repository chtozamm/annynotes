"use client";

import styles from "./posts.module.css";
import SinglePost from "./Post";
import { Post } from "./types";

export default async function Posts({ posts }: any) {
  // Get quantity of posts
  let n = posts.length + 1;

  // const [isReverse, toggleReverse] = useState(false);
  // const [postsOrdered, setPostsOrdered] = useState([]);

  // useEffect(() => {
  //   isReverse ? setPostsOrdered(posts) : setPostsOrdered(posts.reverse());
  // }, [isReverse]);
  return (
    <>
      {/* <button
        className={styles.button}
        // onClick={() => toggleReverse(!isReverse)}
      >
        <Image
          src={"/reverse-icon.svg"}
          width={20}
          height={20}
          alt="Reverse order"
        />
      </button> */}
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
