"use client"

import TextArea from "@/components/TextArea"
import { createPost } from "@/app/actions"
import { generateUniqueId } from "@/app/utils"
import SubmitButton from "@/components/SubmitButton"

export default function ShareForm() {
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim()
    const inputMessage = (data.get("message") as string).trim()

    const newPost: Post = {
      id: generateUniqueId(),
      author: inputName,
      message: inputMessage,
    }

    const res = await createPost(newPost)

    if (res === "fail") {
      console.log("Failed posting a note")
      alert("Couldn't post a note: please, try again")
    }
  }

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="postForm">
      <input
        type="text"
        name="author"
        className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Name"
        autoComplete="off"
      />
      <TextArea />
      {/* <Owl /> */}
      <SubmitButton innerText="Post" />
    </form>
  )
}
