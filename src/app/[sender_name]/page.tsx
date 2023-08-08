"use client"

import Characters from "@/components/Characters"
import styles from "@/styles/posts.module.css"
import { Post } from "@/utils/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useSWR from "swr"

export default function Page({ params }: any) {
  const router = useRouter()
  const sender_name = params.sender_name.replaceAll("_", " ")

  // SWR
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.items)
  const { data, isLoading, error } = useSWR(
    "https://annynotes.pockethost.io/api/collections/posts/records?perPage=500&sort=-created",
    fetcher,
    { refreshInterval: 1000 }
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading notes...</div>

  // Get quantity of posts
  let n = data.filter((post: Post) => post.sender_name === sender_name).length

  return (
    <section className={styles.section}>
      <h2>
        from{" "}
        {
          data.filter((post: Post) => post.sender_name === sender_name)[0]
            .sender_name
        }
        :
      </h2>
      <ul className={styles.list}>
        {data
          .filter((post: Post) => post.sender_name === sender_name)
          .map((post: Post) => (
            <li
              key={post.id}
              className={styles.card}
            >
              <>
                <h4 className={styles.heading}>
                  <Image
                    src={"/icons/scroll-icon.svg"}
                    width={26}
                    height={26}
                    alt="scroll icon"
                    className={styles.scrollIcon}
                  />
                  <button onClick={() => router.push("/posts/" + post.id)}>
                    {/* {isPostPage ? "Note" : ""} */}
                    Note #{n--}
                  </button>
                  <br />
                  <button
                    onClick={() => {
                      // router.push(
                      //   "posts/" + post.sender_name.replaceAll(" ", "_")
                      // )
                      //   setSenderName(post.sender_name)
                      //   setIsSenderPage(true)
                      //   window.scroll(0, 0)
                    }}
                    className={styles.senderName}
                  >
                    {post.sender_name === "stranger"
                      ? "left by a stranger"
                      : `from ` + post.sender_name}

                    <Characters
                      name={post.sender_name}
                      className={styles.profilePicture}
                    />
                  </button>
                </h4>
                <p className={styles.content}>{post.message}</p>
              </>
            </li>
          ))}
      </ul>
      <button
        className={styles.returnButton}
        onClick={() => {
          router.back()
        }}
      >
        <span style={{ position: "absolute", left: "-1.5em" }}>←</span>
        go back
      </button>
    </section>
  )
}
