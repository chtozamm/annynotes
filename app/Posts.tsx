"use client";

import styles from "./posts.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Characters from "./Characters";
import { Post } from "./types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  generateUniqueId,
  clearTextAreaValue,
  updateInputValue,
} from "./utils";
import ErrorMessage from "./ErrorMessage";

export default function Posts({
  data,
  createPost,
  deletePost,
  updatePost,
}: any) {
  const [posts, setPosts] = useState(data);
  const [showAll, setShowAll] = useState(false);
  const [isPostPage, setIsPostPage] = useState(false);
  const [isSenderPage, setIsSenderPage] = useState(false);
  const [isEditing, toggleEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isCreatingPost, setCreatingPost] = useState(false);
  const [currentPostId, setCurrentPostId] = useState("");

  // Get quantity of posts
  let n = posts.length + 1;

  // Filter posts by sender_name
  function getSenderPosts(sender_name: string) {
    setShowAll(true);
    if (isPostPage) setIsPostPage(false);

    if (sender_name.includes("Jack Sparrow")) {
      setPosts(
        data.filter((post: Post) => post.sender_name.includes("Jack Sparrow"))
      );
    } else if (sender_name.includes("Anakin Skywalker")) {
      setPosts(
        data.filter((post: Post) =>
          post.sender_name.includes("Anakin Skywalker")
        )
      );
    } else {
      setPosts(data.filter((post: Post) => post.sender_name === sender_name));
    }
  }

  function getPostById(id: string, sender_name: string, message: string) {
    setCurrentPostId(id);
    setSenderName(sender_name);
    setMessage(message);

    setShowAll(true);
    setPosts(data.filter((post: Post) => post.id === id));
    setIsPostPage(true);
  }

  // Show all posts again
  async function returnToAllPosts() {
    // setSenderName("");
    updateInputValue(senderName);
    setMessage("");
    setCurrentPostId("");
    toggleEditing(false);
    setIsPostPage(false);
    setIsSenderPage(false);
    setShowAll(false);
    setCreatingPost(false);
    setPosts(data);
  }

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
  });

  function callConfirm(id: string) {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            {
              deletePost(id);
              const newData = data.filter((p: Post) => p.id !== id);
              data = newData;
              setPosts(newData);
              setShowAll(false);
              setIsPostPage(false);
              toggleEditing(false);
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
    <>
      {data.length === 0 ? (
        <ErrorMessage />
      ) : (
        <>
          {showAll === false && (
            <div className={styles.formCreateContainer}>
              {isCreatingPost === true ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (message) {
                      const id = generateUniqueId();
                      posts.unshift({
                        id: id,
                        sender_name: senderName || "stranger",
                        message: message,
                        created: Date.now(),
                      });
                      createPost(id, senderName, message);
                    }
                    setMessage("");
                    clearTextAreaValue();
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
                    onChange={(e) => setSenderName(e.target.value)}
                    autoComplete="off"
                  />
                  <textarea
                    className={styles.textArea}
                    placeholder="Your story"
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    autoComplete="off"
                  />
                  <button type="submit" className={styles.button}>
                    POST
                  </button>
                  <button
                    onClick={() => setCreatingPost(false)}
                    className={`${styles.button}
                                ${styles.activeButton}`}
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
          )}
<<<<<<< HEAD
          {showAll && isEditing === false && (
            <button
              className={styles.returnButton}
              onClick={() => {
                returnToAllPosts();
                window.scrollTo(0, 0)
              }}
            >
              <span style={{ position: "absolute", left: "-1.5em" }}>←</span>
              back to all notes
            </button>
          )}
          {isPostPage === false && isSenderPage && (
            <h2 style={{ marginTop: "1em" }}>Notes from {senderName}:</h2>
          )}
          {isPostPage === false && isSenderPage === false && (
            <h2>Recent notes:</h2>
          )}
          <ul className={isEditing ? styles.invisible : styles.list}>
            {posts.map((post: Post) => {
              n--;
              return (
                <li key={post.id} className={styles.card}>
                  {isEditing === false && (
                    <>
                      <h3 className={styles.heading}>
                        <Image
                          src={"/scroll-icon.svg"}
                          width={26}
                          height={26}
                          alt="scroll icon"
                          className={styles.scrollIcon}
                        />
                        <button
                          onClick={() => {
                            getPostById(post.id);
                          }}
                        >
                          {n ? `Note #${n}` : "Note"}
                        </button>
                        <br />
                        <button
                          onClick={() => {
                            getSenderPosts(post.sender_name);
                            setSenderName(post.sender_name);
                            setIsSenderPage(true);
                            window.scroll(0, 0)
                          }}
                          className={styles.senderName}
                        >
                          {post.sender_name === "stranger"
                            ? "left by a stranger"
                            : `from ` + post.sender_name}

                          <Characters
                            name={post.sender_name}
                            className={styles.profilePicture}
=======
          <section>
            {showAll && isEditing === false && (
              <button
                className={styles.returnButton}
                onClick={() => {
                  returnToAllPosts();
                  window.scrollTo(0, 0);
                }}
              >
                <span style={{ position: "absolute", left: "-1.5em" }}>←</span>
                back to all notes
              </button>
            )}
            {isPostPage === false && isSenderPage && (
              <h2 style={{ marginTop: "1em" }}>Notes from {senderName}:</h2>
            )}
            {isPostPage === false && isSenderPage === false && (
              <h2>Recent notes:</h2>
            )}
            <ul className={isEditing ? styles.invisible : styles.list}>
              {posts.map((post: Post) => {
                n--;
                return (
                  <li key={post.id} className={styles.card}>
                    {isEditing === false && (
                      <>
                        <h4 className={styles.heading}>
                          <Image
                            src={"/scroll-icon.svg"}
                            width={26}
                            height={26}
                            alt="scroll icon"
                            className={styles.scrollIcon}
>>>>>>> 53ff7ff (redesign, fix content overflow break-word)
                          />
                          <button
                            onClick={() => {
                              getPostById(
                                post.id,
                                post.sender_name,
                                post.message
                              );
                            }}
                          >
                            {n ? `Note #${n}` : "Note"}
                          </button>
                          <br />
                          <button
                            onClick={() => {
                              getSenderPosts(post.sender_name);
                              setSenderName(post.sender_name);
                              setIsSenderPage(true);
                              window.scroll(0, 0);
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
                        <p className={styles.date}>
                          {`at `}
                          {post.created}
                        </p>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            {isPostPage && isEditing === false && (
              <div className={styles.actionsContainer}>
                <button
                  onClick={() => {
                    toggleEditing(true);
                  }}
                  className={styles.button}
                >
                  EDIT
                </button>
                <button
                  onClick={() => {
                    callConfirm(currentPostId);
                  }}
                  className={`${styles.button} ${styles.activeButton}`}
                >
                  DELETE
                </button>
              </div>
            )}
            {isPostPage && (
              <>
                <div className={styles.formEditContainer}>
                  {isEditing && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (message) {
                          updatePost(currentPostId, senderName, message);
                          const updatedPost = data.find(
                            (p: Post) => p.id === currentPostId
                          );
                          updatedPost["sender_name"] = senderName;
                          updatedPost["message"] = message;
                        }
                        toggleEditing(false);
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
                      <button type="submit" className={styles.button}>
                        UPDATE
                      </button>
                    </form>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => toggleEditing(false)}
                      className={`${styles.button}
                                ${styles.activeButton}`}
                    >
                      CANCEL
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
