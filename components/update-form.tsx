"use client";

import { updateNote } from "@/app/actions";
import { Note } from "@/app/types";
import SubmitButton from "@/components/submit-button";
import TextArea from "@/components/text-area";
import { useRouter } from "next/navigation";

export default function UpdateForm({ note }: { note: Note }) {
  const router = useRouter();
  const handleForm = async (data: FormData) => {
    const inputName = (data.get("author") as string).trim();
    const inputMessage = (data.get("message") as string).trim();

    const updatedNote: Note = {
      ...note,
      author: inputName || note.author,
      message: inputMessage || note.message,
    };

    const err = await updateNote(updatedNote);

    if (err) {
      alert(err);
    }
  };

  return (
    <>
      <form
        action={handleForm}
        className="flex w-full max-w-sm flex-col items-center gap-4"
        id="noteForm"
      >
        <input
          type="text"
          name="author"
          className="border-primary lg:focus-visible:bg-secondary lg:focus-visible:shadow-secondary w-full max-w-sm rounded-xl border-t-2 px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:shadow-md"
          placeholder="Name"
          defaultValue={note.author}
          autoComplete="off"
        />
        <TextArea defaultValue={note.message} />
        {/* <Owl /> */}
        <div className="flex w-full flex-col gap-2">
          <SubmitButton innerText="Update" />
          <span className="text-center text-sm text-zinc-400">or</span>
        </div>
      </form>
      <button
        onClick={() => router.back()}
        className="border-primary text-primary lg:focus-visible:ring-primary mx-auto mt-4 mb-8 w-full max-w-sm rounded-xl border-2 bg-white py-4 text-center text-[0.75em] font-black uppercase outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
      >
        Cancel
      </button>
    </>
  );
}
