"use client";

import { useState } from "react";
import { createPost } from "./actions";
import { generateUniqueId } from "./utils";

export default function ShareForm() {
  const [isOpen, toggleOpen] = useState(false);
  const passkey = localStorage.getItem("annynotes_passkey") || "";
  const handleForm = async (data: FormData) => {
    if (
      data.get("passkey") === process.env.NEXT_PUBLIC_PASSKEY ||
      passkey === process.env.NEXT_PUBLIC_PASSKEY
    ) {
      if (
        localStorage.getItem("annynotes_passkey") !==
        process.env.NEXT_PUBLIC_PASSKEY
      ) {
        localStorage.setItem(
          "annynotes_passkey",
          process.env.NEXT_PUBLIC_PASSKEY,
        );
      }
      const newPost = {
        id: generateUniqueId(),
        author: data.get("author"),
        message: data.get("message"),
      } as Post;
      const res = await createPost(newPost);
      if (res) {
        const postForm = document.getElementById("postForm") as HTMLFormElement;
        postForm?.reset();
      } else {
        console.log("Couldn't post a note: please, try again");
        alert("Couldn't post a note: please, try again");
      }
    } else {
      console.log("Incorrect passkey");
      alert("Incorrect passkey");
    }
  };
  return (
    <>
      {isOpen && (
        <form
          action={handleForm}
          className="flex w-full max-w-sm flex-col items-center gap-4"
          id="postForm"
        >
          <input
            type="text"
            name="author"
            className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-within:bg-[#fffbf7] focus-within:shadow-md focus-within:shadow-[#fffbf7] sm:px-3 sm:py-3"
            placeholder="Name"
            autoComplete="off"
          />
          <textarea
            name="message"
            className="w-full max-w-sm resize-none overflow-hidden rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-within:bg-[#fffbf7] focus-within:shadow-md focus-within:shadow-[#fffbf7] sm:px-3 sm:py-3"
            placeholder="Message"
            autoComplete="off"
            rows={3}
            required
          />
          <input
            type="password"
            name="passkey"
            className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-within:bg-[#fffbf7] focus-within:shadow-md focus-within:shadow-[#fffbf7] disabled:pointer-events-none disabled:text-zinc-400 sm:px-3 sm:py-3"
            placeholder="Passkey*"
            defaultValue={passkey}
            disabled={process.env.NEXT_PUBLIC_PASSKEY === passkey}
            autoComplete="off"
            required
          />
          <div className="flex w-full items-center justify-center">
            <p className="px-2 text-center text-sm text-zinc-400">
              Passkey is required to summon the owl <br />
              and bring your note to the board
            </p>
            <span className="text-3xl">🦉</span>
          </div>
          <button
            className="mx-auto mb-4 w-full max-w-sm rounded-xl bg-[#ffb220] py-4 text-[0.75em] font-black uppercase text-white outline-none focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4"
            type="submit"
          >
            Post
          </button>
        </form>
      )}
      <button
        className={`mx-auto w-full max-w-sm rounded-xl py-4 text-[0.75em] font-black uppercase outline-none focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4
      ${
        isOpen
          ? "border-2 border-[#ffb220] bg-white text-[#ffb220]"
          : "bg-[#ffb220] text-white"
      }`}
        onClick={() => toggleOpen(!isOpen)}
      >
        {!isOpen ? "Share" : "Close"}
      </button>
    </>
  );
}
