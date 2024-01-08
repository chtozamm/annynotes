"use client";

import TextArea from "@/components/TextArea";
import { createPost } from "../../actions";
import { generateUniqueId } from "../../utils";
import SubmitButton from "@/components/SubmitButton";

export default function ShareForm() {
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();
    const inputPasskey = data.get("passkey") || "";

    if (inputPasskey === process.env.NEXT_PUBLIC_PASSKEY) {
      const newPost: Post = {
        id: generateUniqueId(),
        author: inputName,
        message: inputMessage,
      };

      const res = await createPost(newPost);

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
    <>
      <form
        action={handleForm}
        className="flex w-full max-w-sm flex-col items-center gap-4"
        id="postForm"
      >
        <input
          type="text"
          name="author"
          className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-[#fffbf7] lg:focus-visible:shadow-md lg:focus-visible:shadow-[#fffbf7]"
          placeholder="Name"
          autoComplete="off"
        />
        <TextArea />
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
        <SubmitButton innerText="Post" />
      </form>
    </>
  );
}
