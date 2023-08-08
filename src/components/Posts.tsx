"use client"

import { Post } from "@/utils/types"
import useSWR from "swr"
import { useState } from "react"
import styles from "@/styles/posts.module.css"
import Image from "next/image"
import { clearTextAreaValue, generateUniqueId } from "@/utils/utils"
import Characters from "./Characters"
import { useRouter, useSearchParams } from "next/navigation"

export default function Posts({ createPost }: any) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [isCreatingPost, setCreatingPost] = useState(false)
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || ""

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

  const posts = data.filter((post: Post) => post.id !== filter)
  // Get quantity of posts
  let n = posts.length

  return (
    <>
      <div className={styles.formCreateContainer}>
        {isCreatingPost ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (message) {
                const id = generateUniqueId()
                posts.unshift({
                  id: id,
                  sender_name: senderName || "stranger",
                  message: message,
                  created: Date.now(),
                })
                createPost(id, senderName, message)
              }
              setMessage("")
              clearTextAreaValue()
            }}
            className={styles.form}
          >
            <h2>New note:</h2>

            <input
              id="inputName"
              type="text"
              name="name"
              placeholder="Your name"
              className={styles.input}
              onChange={(e) => setSenderName(e.target.value.trim())}
              autoComplete="off"
            />
            <textarea
              className={styles.textArea}
              placeholder="Your story"
              onChange={(e) => setMessage(e.target.value.trim())}
              name="message"
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.button}
            >
              POST
            </button>
            <button
              onClick={() => setCreatingPost(false)}
              className={`${styles.button} ${styles.activeButton}`}
            >
              CLOSE
            </button>
          </form>
        ) : (
          <button
            onClick={() => setCreatingPost(true)}
            className={styles.button}
          >
            SHARE
          </button>
        )}
      </div>
      <section className={styles.section}>
        <h2>Recent notes:</h2>
        <ul className={styles.list}>
          {posts.map((post: Post) => (
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
                  <button
                    onClick={() => {
                      router.push("/posts/" + post.id)
                    }}
                  >
                    Note #{n--}
                  </button>
                  <br />
                  <button
                    onClick={() => {
                      router.push("/" + post.sender_name.replaceAll(" ", "_"))
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
      </section>
    </>
  )
}
