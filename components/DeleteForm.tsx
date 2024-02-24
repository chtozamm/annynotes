"use client"

import { deletePost } from "@/app/actions"
import SubmitButton from "@/components/SubmitButton"
import Link from "next/link"

export default function DeleteForm({ id }: { id: string }) {
  const handleForm = async (data: FormData) => {
    // const inputPasskey = data.get("passkey") || ""

    // if (inputPasskey === process.env.NEXT_PUBLIC_PASSKEY) {
    const res = await deletePost(id)
    if (res === "fail") {
      console.log("Failed deleting a note")
      alert("Couldn't delete a note: please, try again")
    }
    // } else {
    //   console.log("Authorization failed: incorrect passkey")
    //   alert("Authorization failed: incorrect passkey")
    // }
  }

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="postForm">
      {/* <input
        type="password"
        name="passkey"
        className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Passkey"
        autoComplete="off"
        required
      /> */}
      <div className="flex w-full items-center justify-center">
        <p className="mx-2 text-center text-sm text-zinc-400">
          You are about to remove a note from the board.
          <br />
          Are you sure you want to proceed?
        </p>
        <span className="text-3xl">🦉</span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <SubmitButton innerText="Delete" />
        <span className="text-center text-sm text-zinc-400">or</span>
        <Link
          href="/"
          className="mx-auto w-full max-w-sm rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
          Cancel
        </Link>
      </div>
    </form>
  )
}
