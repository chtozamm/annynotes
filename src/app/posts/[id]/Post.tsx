"use client"

import Characters from "@/components/Characters"
import styles from "@/styles/posts.module.css"
import { Post } from "@/utils/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Post({
  id,
  updatePost,
  deletePost,
}: {
  id: string
  updatePost: Function
  deletePost: Function
}) {
  const { data, error } = useSWR("/api/posts", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data)
    return (
      <>
        <div>Loading notes...</div>
      </>
    )

  const posts: Post[] = data.filter((post: Post) => post.id === id)

  const router = useRouter()

  function callConfirm(id: string) {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            {
              deletePost(id)
              router.replace("/" + posts[0].sender_name.replaceAll(" ", "_"))
            }
          },
        },
        {
          label: "No",
        },
      ],
    })
  }

  const [isEditing, toggleEditing] = useState(false)
  const [message, setMessage] = useState(posts[0].message)
  const [senderName, setSenderName] = useState(posts[0].sender_name)

  return (
    <section className={styles.section}>
      <h2>from {senderName}:</h2>
      {!isEditing && (
        <>
          <ul className={styles.list}>
            {posts.map((post) => (
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
                    <button>Note</button>
                    <br />
                    <button
                      onClick={() => {
                        router.push("/" + senderName.replaceAll(" ", "_"))
                      }}
                      className={styles.senderName}
                    >
                      {senderName === "stranger"
                        ? "left by a stranger"
                        : `from ` + senderName}
                      <Characters
                        name={senderName}
                        className={styles.profilePicture}
                      />
                    </button>
                  </h4>
                  <p className={styles.content}>{message}</p>
                </>
              </li>
            ))}
          </ul>
          <div className={styles.actionsContainer}>
            <button
              onClick={() => {
                toggleEditing(true)
              }}
              className={styles.button}
            >
              EDIT
            </button>
            <button
              onClick={() => {
                callConfirm(posts[0].id)
              }}
              className={`${styles.button} ${styles.activeButton}`}
            >
              DELETE
            </button>
          </div>
        </>
      )}
      {isEditing && (
        <>
          <div className={isEditing ? styles.formEditContainer : styles.hidden}>
            {isEditing && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (message) {
                    updatePost(posts[0].id, senderName.trim(), message.trim())
                    router.refresh()
                  }
                  toggleEditing(false)
                }}
                className={styles.form}
              >
                <h2>Edit note:</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Edit name"
                  value={senderName}
                  className={styles.input}
                  onChange={(e) => setSenderName(e.target.value)}
                />
                <textarea
                  id="textarea"
                  className={styles.textArea}
                  placeholder="Edit message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                />
                <button
                  type="submit"
                  className={styles.button}
                >
                  UPDATE
                </button>
              </form>
            )}
            {isEditing && (
              <button
                onClick={() => toggleEditing(false)}
                className={`${styles.button} ${styles.activeButton}`}
              >
                CANCEL
              </button>
            )}
          </div>
        </>
      )}
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
