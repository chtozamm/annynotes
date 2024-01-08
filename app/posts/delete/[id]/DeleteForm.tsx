"use client";

import { deletePost } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

export default function DeleteForm({ id }: { id: string }) {
  const handleForm = async (data: FormData) => {
    const inputPasskey = data.get("passkey") || "";

    if (inputPasskey === process.env.NEXT_PUBLIC_PASSKEY) {
      const res = await deletePost(id);
      if (res === "fail") {
        console.log("Failed deleting a note");
        alert("Couldn't delete a note: please, try again");
      }
    } else {
      console.log("Authorization failed: incorrect passkey");
      alert("Authorization failed: incorrect passkey");
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
          type="password"
          name="passkey"
          className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-[#fffbf7] lg:focus-visible:shadow-md lg:focus-visible:shadow-[#fffbf7]"
          placeholder="Passkey*"
          autoComplete="off"
          required
        />
        <SubmitButton innerText="Delete" />
      </form>
    </>
  );
}
