import { getSession } from "@/app/lib";
import { Note } from "@/app/types";
import LinkButton from "@/components/link-button";
import Posts from "@/components/notes";

export default async function UserPosts() {
  const [, userId] = await getSession();
  const notes: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] }, cache: "force-cache" },
  )
    .then((res) => res.json())
    .then((data) =>
      (data.items as Note[]).filter((post) => post.user_id === userId),
    );
  return (
    <>
      <LinkButton label="Share" />
      <h2 className="font-ringbearer text-primary mb-8 w-full text-center text-2xl font-bold lowercase">
        {notes.length > 0 ? "Your notes:" : "You haven't posted anything yet"}
      </h2>
      <Posts notes={notes} />
    </>
  );
}
