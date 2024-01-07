"use client";

import { deletePost } from "@/app/actions";

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
          className="w-full max-w-sm rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 focus-visible:bg-[#fffbf7] focus-visible:shadow-md focus-visible:shadow-[#fffbf7] sm:px-3 sm:py-3"
          placeholder="Passkey*"
          autoComplete="off"
          required
        />
        <button
          className="mx-auto mb-4 w-full max-w-sm rounded-xl bg-[#ffb220] py-4 text-[0.75em] font-black uppercase text-white outline-none hover:bg-amber-500 focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4"
          type="submit"
        >
          Delete
        </button>
      </form>
    </>
  );
}
