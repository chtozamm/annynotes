"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./form.module.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Form({ updatePost, deletePost, post }: any) {
  const [senderName, setSenderName] = useState(post.sender_name);
  const [message, setMessage] = useState(post.message);
  const [isShown, setShown] = useState(false);

  // Expand textarea by demand
  useEffect(() => {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].addEventListener("input", OnInput, false);
      tx[i].style.height = tx[i].scrollHeight + "px";
    }
    function OnInput(this: HTMLElement) {
      this.style.height = "0";
      this.style.height = this.scrollHeight + "px";
    }
  }, [isShown]);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function callConfirm() {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            {
              deletePost(post.id);
              router.replace("/");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <div className={styles.formContainer}>
      <button onClick={() => setShown(!isShown)} className={styles.button}>
        {isShown ? "CLOSE" : "EDIT"}
      </button>
      {isShown && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (message) {
                startTransition(
                  async () => await updatePost(post.id, senderName, message)
                );
              }
              router.refresh();
            }}
            className={styles.form}
          >
            <h2>Edit the note:</h2>
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
            <button type="submit" className={styles.button}>
              UPDATE
            </button>
          </form>
        </>
      )}
      {isShown === false && (
        <button
          className={styles.button}
          onClick={async () => {
            callConfirm();
            router.refresh();
          }}
          style={{
            width: "90vw",
            maxWidth: "640px",
            backgroundColor: "darkgoldenred",
            marginBottom: "3em",
          }}
        >
          DELETE
        </button>
      )}
    </div>
  );
}
