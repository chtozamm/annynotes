"use client"

import { updatePost } from "@/app/actions"
import SubmitButton from "@/components/SubmitButton"
import TextArea from "@/components/TextArea"
import { useRouter } from "next/navigation"

export default function UpdateForm({ post }: { post: Post }) {
  const router = useRouter()
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim()
    const inputMessage = (data.get("message") as string).trim()

    const updatedPost: Post = {
      id: post.id,
      author: inputName || post.author,
      message: inputMessage || post.message,
    }

    const res = await updatePost(updatedPost)

    if (res === "fail") {
      console.log("Failed posting a note")
      alert("Couldn't post a note: please, try again")
    }
  }

  return (
    <>
      <form
        action={handleForm}
        className="flex w-full max-w-sm flex-col items-center gap-4"
        id="postForm">
        <input
          type="text"
          name="author"
          className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
          placeholder="Name"
          defaultValue={post.author}
          autoComplete="off"
        />
        <TextArea defaultValue={post.message} />
        {/* <Owl /> */}
        <div className="flex w-full flex-col gap-2">
          <SubmitButton innerText="Update" />
          <span className="text-center text-sm text-zinc-400">or</span>
        </div>
      </form>
      <button
        onClick={() => router.back()}
        className="mx-auto mb-8 mt-4 w-full max-w-sm rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
        Cancel
      </button>
    </>
  )
}
