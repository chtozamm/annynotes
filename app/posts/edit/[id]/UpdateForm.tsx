"use client";

import Link from "next/link";
import { updatePost } from "../../../actions";
import SubmitButton from "@/components/SubmitButton";
import TextArea from "@/components/TextArea";

export default function UpdateForm({ post }: { post: Post }) {
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();
    const inputPasskey = data.get("passkey") || "";

    if (inputPasskey === process.env.NEXT_PUBLIC_PASSKEY) {
      const updatedPost: Post = {
        id: post.id,
        author: inputName || post.author,
        message: inputMessage || post.message,
      };

      const res = await updatePost(updatedPost);

      if (res === "fail") {
        console.log("Failed posting a note");
        alert("Couldn't post a note: please, try again");
      }
    } else {
      console.log("Authorization failed: incorrect passkey");
      alert("The passkey is not correct 🦉");
    }
  };

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="postForm"
    >
      <input
        type="text"
        name="author"
        className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-[#fffbf7] lg:focus-visible:shadow-md lg:focus-visible:shadow-[#fffbf7]"
        placeholder="Name"
        defaultValue={post.author}
        autoComplete="off"
      />
      <TextArea defaultValue={post.message} />
      <input
        type="password"
        name="passkey"
        className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-[#fffbf7] lg:focus-visible:shadow-md lg:focus-visible:shadow-[#fffbf7]"
        placeholder="Passkey*"
        autoComplete="off"
        required
      />
      <div className="flex w-full items-center justify-center">
        <p className="px-2 text-center text-sm text-zinc-400">
          {/* <>
                The owl remembers you <br />
                and is ready to fetch your note
              </> */}
          A passkey is required to summon the owl <br />
          and have it bring your note to the board
        </p>
        <span className="text-3xl">🦉</span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <SubmitButton innerText="Update" />
        <span className="text-center text-sm text-zinc-400">or</span>
        <Link
          href="/"
          className="mx-auto w-full max-w-sm rounded-xl border-2 border-[#ffb220] bg-white py-4 text-center text-[0.75em] font-black uppercase text-[#ffb220] outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-[#ffb220] lg:focus-visible:ring-offset-4"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
