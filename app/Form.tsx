"use client";

import { useState, useTransition } from "react";
import styles from "./form.module.css";

export default function Form({ createPost }: any) {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");

  const [isPending, startTransition] = useTransition();

  function clearTextAreaValue() {
    const textarea = document.querySelector("textarea");
    if (textarea) textarea.value = "";
  }
  function clearInputValue() {
    const input = document.querySelector("input");
    if (input) input.value = "";
  }

  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message) {
            startTransition(() => createPost(message, senderName));
          }
          setMessage("");
          clearTextAreaValue();
          clearInputValue();
        }}
        className={styles.form}
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className={styles.input}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          placeholder="Your story"
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <button type="submit" className={styles.button}>
          POST
        </button>
      </form>
    </div>
  );
}
