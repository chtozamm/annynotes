"use client";

import styles from "./posts.module.css";
import Image from "next/image";

type Post = {
  id: number;
  message: string;
  name: string;
};

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
              <h3 className={styles.heading}>
                <Image
                  src={"scroll-icon.svg"}
                  width={20}
                  height={20}
                  alt="scroll icon"
                  className={styles.scrollIcon}
                />
                <strong>Note #{n}</strong>
                <br />
                <span className={styles.senderName}>
                  {post.name ? `from ${post.name}` : `left by a stranger`}
                  {post.name === "Jar Jar" && (
                    <Image
                      src={"/profile/jar-jar.png"}
                      width={20}
                      height={20}
                      alt="Jar Jar"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Darth Vader" && (
                    <Image
                      src={"/profile/darth-vader.png"}
                      width={20}
                      height={20}
                      alt="Darth Vader"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Geralt of Rivia" && (
                    <Image
                      src={"/profile/geralt.png"}
                      width={20}
                      height={20}
                      alt="Geralt of Rivia"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Obi-Wan Kenobi" && (
                    <Image
                      src={"/profile/obi-wan-kenobi.png"}
                      width={20}
                      height={20}
                      alt="Obi-Wan Kenobi"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Bilbo Baggins" && (
                    <Image
                      src={"/profile/bilbo-baggins.png"}
                      width={20}
                      height={20}
                      alt="Bilbo Baggins"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Indiana Jones" && (
                    <Image
                      src={"/profile/indiana-jones.png"}
                      width={20}
                      height={20}
                      alt="Indiana Jones"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Gollum" && (
                    <Image
                      src={"/profile/gollum.png"}
                      width={20}
                      height={20}
                      alt="Gollum"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Samwise Gamgee" && (
                    <Image
                      src={"/profile/sam.png"}
                      width={20}
                      height={20}
                      alt="Samwise Gamgee"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Frodo Baggins" && (
                    <Image
                      src={"/profile/frodo.png"}
                      width={20}
                      height={20}
                      alt="Frodo Baggins"
                      className={styles.profilePicture}
                    />
                  )}
                  {post.name === "Captain Jack Sparrow" && (
                    <Image
                      src={"/profile/jack-sparrow.png"}
                      width={20}
                      height={20}
                      alt="Captain Jack Sparrow"
                      className={styles.profilePicture}
                    />
                  )}
                </span>
              </h3>
              <p className={styles.content}>{post.message}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
