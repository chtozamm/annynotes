import Link from "next/link";
import Characters from "./Characters";
import styles from "./posts.module.css";
import Image from "next/image";
import { Post } from "./types";

export default function SinglePost({ post, n }: { post: Post; n?: number }) {
  return (
    <>
      <h3 className={styles.heading}>
        <Image
          src={"/scroll-icon.svg"}
          width={26}
          height={26}
          alt="scroll icon"
          className={styles.scrollIcon}
        />
        <Link href={`/posts/${post.id}`}>{n ? `Note #${n}` : "Note"}</Link>
        <br />
        <Characters name={post.sender_name} />
      </h3>
      <p className={styles.content}>{post.message}</p>
    </>
  );
}
