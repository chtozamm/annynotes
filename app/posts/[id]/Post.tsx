import Image from "next/image";
import styles from "@/app/posts.module.css";
import Characters from "@/app/Characters";

export default function Post({ post }: { post: any }) {
  return (
    <ul className={styles.list} style={{ marginBottom: "1em" }}>
      <li key={post.id} className={styles.card}>
        <h3 className={styles.heading}>
          <Image
            src={"/scroll-icon.svg"}
            width={26}
            height={26}
            alt="scroll icon"
            className={styles.scrollIcon}
          />
          <span>Note</span>
          <br />
          <Characters name={post.name} />
        </h3>
        <p className={styles.content}>{post.message}</p>
      </li>
    </ul>
  );
}
