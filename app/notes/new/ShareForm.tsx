"use client";

import TextArea from "@/components/TextArea";
import { createNote } from "@/lib/actions";
import { generateUniqueId } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";

export default function ShareForm() {
  //   {
  //   user,
  // }: {
  //   user: { id: string; verified: boolean };
  // }
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();

    const newNote: Note = {
      id: generateUniqueId(),
      author: inputName,
      message: inputMessage,
      // user_id: user.id,
      // verified: user.verified,
    };

    const err = await createNote(newNote);

    if (err) {
      alert(err);
    }
  };

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="share-note-form"
    >
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
  );
}
