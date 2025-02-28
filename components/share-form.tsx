"use client";

import TextArea from "@/components/text-area";
import { createNote } from "@/app/actions";
import { generateUniqueId } from "@/app/utils";
import SubmitButton from "@/components/submit-button";
import { Note } from "@/app/types";

export default function ShareForm({
  user,
}: {
  user: { id: string; verified: boolean };
}) {
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();

    const newNote: Note = {
      id: generateUniqueId(),
      author: inputName,
      message: inputMessage,
      user_id: user.id,
      verified: user.verified,
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
      id="noteForm"
    >
      <input
        type="text"
        name="author"
        className="border-primary lg:focus-visible:bg-secondary lg:focus-visible:shadow-secondary w-full max-w-sm rounded-xl border-t-2 px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:shadow-md"
        placeholder="Name"
        autoComplete="off"
      />
      <TextArea />
      {/* <Owl /> */}
      <SubmitButton innerText="Note" />
    </form>
  );
}
