"use client";

import { useState, useRef, useEffect } from "react";
import { createPost } from "./actions";
import { generateUniqueId } from "./utils";
import { useSWRConfig } from "swr";

export default function ShareForm() {
  const { mutate } = useSWRConfig();
  const [isOpen, toggleOpen] = useState(false);
  const passkey = useRef("");
  const name = useRef("");

  useEffect(() => {
    passkey.current = localStorage.getItem("annynotes_passkey") as string;
  }, []);

  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();
    const inputPasskey = passkey.current || (data.get("passkey") as string);

    if (inputPasskey === process.env.NEXT_PUBLIC_PASSKEY) {
      const newPost: Post = {
        id: generateUniqueId(),
        author: inputName,
        message: inputMessage,
      };

      try {
        await createPost(newPost);

        mutate(
          `${process.env.NEXT_PUBLIC_DB_URL}?sort=-created&perPage=1000`,
          (prevData) => [newPost, ...(prevData ?? [])],
          false,
        );

        toggleOpen(false);
        name.current = inputName;
        passkey.current = inputPasskey;
        if (localStorage.getItem("annynotes_passkey") !== inputPasskey) {
          localStorage.setItem("annynotes_passkey", inputPasskey);
        }
      } catch (error) {
        console.log("Error posting a note:", error);
        alert("Couldn't post a note: please, try again");
      }
    } else {
      console.log("Authorization failed: incorrect passkey");
      alert("Authorization failed: incorrect passkey");
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
            defaultValue={name.current}
            className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-visible:bg-[#fffbf7] focus-visible:shadow-md focus-visible:shadow-[#fffbf7] sm:px-3 sm:py-3"
            placeholder="Name"
            autoComplete="off"
          />
          <textarea
            name="message"
            className="w-full max-w-sm resize-none overflow-hidden rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-visible:bg-[#fffbf7] focus-visible:shadow-md focus-visible:shadow-[#fffbf7] sm:px-3 sm:py-3"
            placeholder="Message"
            autoComplete="off"
            rows={3}
            required
          />
          {passkey.current !== process.env.NEXT_PUBLIC_PASSKEY && (
            <input
              type="password"
              name="passkey"
              className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-visible:bg-[#fffbf7] focus-visible:shadow-md focus-visible:shadow-[#fffbf7] sm:px-3 sm:py-3"
              placeholder="Passkey*"
              defaultValue={passkey.current}
              autoComplete="off"
              required
            />
          )}
          <div className="flex w-full items-center justify-center">
            <p className="px-2 text-center text-sm text-zinc-400">
              {passkey.current === process.env.NEXT_PUBLIC_PASSKEY ? (
                <>
                  The owl remembers you <br />
                  and is ready to fetch your note
                </>
              ) : (
                <>
                  A passkey is required to summon the owl <br />
                  and have it bring your note to the board
                </>
              )}
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
