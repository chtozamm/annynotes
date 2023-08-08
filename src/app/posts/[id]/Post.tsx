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

export default function Post({
  id,
  updatePost,
  deletePost,
}: {
  id: string
  updatePost: Function
  deletePost: Function
}) {
  const router = useRouter()
  const [isEditing, toggleEditing] = useState(false)
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")

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

  let post = data.filter((post: Post) => post.id === id) || null

  if (post.length === 0) {
    return (
      <section className={styles.section}>
        <div>This post has magically disappeared ✨</div>
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
  } else {
    post = post[0]
  }

  // Delete post handler
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
              router.replace("/?filter=" + id)
            }
          },
        },
        {
          label: "No",
        },
      ],
    })
  }
  return (
    <section className={styles.section}>
      <>
        <h2>from {senderName === "" ? post.sender_name : senderName}:</h2>
        {!isEditing ? (
          <>
            <ul className={styles.list}>
              {data
                .filter((post: Post) => post.id === id)
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
                        <button>Note</button>
                        <br />
                        <button
                          onClick={() => {
                            router.push(
                              "/" +
                                data
                                  .filter((post: Post) => post.id === id)[0]
                                  .sender_name.replaceAll(" ", "_")
                            )
                          }}
                          className={styles.senderName}
                        >
                          {senderName === ""
                            ? post.sender_name
                            : senderName === "stranger"
                            ? "left by a stranger"
                            : `from ` + senderName === ""
                            ? post.sender_name
                            : senderName}
                          <Characters
                            name={
                              senderName === "" ? post.sender_name : senderName
                            }
                            className={styles.profilePicture}
                          />
                        </button>
                      </h4>
                      <p className={styles.content}>
                        {message === "" ? post.message : message}
                      </p>
                    </>
                  </li>
                ))}
            </ul>
            <div className={styles.actionsContainer}>
              <button
                onClick={() => {
                  toggleEditing(true)
                  setSenderName(post.sender_name)
                  setMessage(post.message)
                }}
                className={styles.button}
              >
                EDIT
              </button>
              <button
                onClick={() => {
                  callConfirm(post.id)
                }}
                className={`${styles.button} ${styles.activeButton}`}
              >
                DELETE
              </button>
            </div>
          </>
        ) : (
          <div className={styles.formEditContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (message) {
                  updatePost(post.id, senderName.trim(), message.trim())
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
            <button
              onClick={() => toggleEditing(false)}
              className={`${styles.button} ${styles.activeButton}`}
            >
              CANCEL
            </button>
          </div>
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
      </>
    </section>
  )
}
