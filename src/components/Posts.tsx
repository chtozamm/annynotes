"use client"

import { Post } from "@/utils/types"
import useSWR from "swr"
import { useState, useEffect } from "react"
import styles from "@/styles/posts.module.css"
import Image from "next/image"
import { clearTextAreaValue, generateUniqueId } from "@/utils/utils"
import Characters from "./Characters"
import { useRouter } from "next/navigation"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Posts({ createPost, deletePost, updatePost }: any) {
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [isCreatingPost, setCreatingPost] = useState(false)

  const { data, error } = useSWR("/api/posts", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data)
    return (
      <>
        <div>Loading notes...</div>
      </>
    )

  const posts = data
  // Get quantity of posts
  let n = posts.length

  const router = useRouter()

  // // Expand textarea by demand
  // useEffect(() => {
  //   const tx = document.getElementsByTagName("textarea")
  //   for (let i = 0; i < tx.length; i++) {
  //     tx[i].addEventListener("input", OnInput, false)
  //     tx[i].style.height = tx[i].scrollHeight + "px"
  //   }
  //   function OnInput(this: HTMLElement) {
  //     this.style.height = "0"
  //     this.style.height = this.scrollHeight + "px"
  //   }
  // })

  return (
    <>
      <div className={styles.formCreateContainer}>
        {isCreatingPost === true ? (
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
