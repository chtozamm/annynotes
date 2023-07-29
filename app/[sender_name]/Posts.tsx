import Link from "next/link";
import Characters from "@/app/Characters";
import styles from "../posts.module.css";
import Image from "next/image";
import { Post } from "@/app/types";

export default function Posts({ posts }: any) {
  return (
    <>
      <ul className={styles.list}>
        {posts.map((post: Post) => {
          return (
            <li key={post.id} className={styles.card}>
              <h3 className={styles.heading}>
                <Image
                  src={"/scroll-icon.svg"}
                  width={26}
                  height={26}
                  alt="scroll icon"
                  className={styles.scrollIcon}
                />
                <Link href={`/posts/${post.id}`}>Note</Link>
                <br />
                <Characters name={post.sender_name} />
              </h3>
              <p className={styles.content}>{post.message}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
