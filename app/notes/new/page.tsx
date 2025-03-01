import { getSession } from "@/app/actions";
import ShareForm from "@/components/share-form";

export default async function Page() {
  const { user_id } = await getSession();
  return (
    <>
      <h2 className="font-ringbearer text-primary w-full text-center text-2xl font-bold lowercase">
        New note
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new note</p>
      <ShareForm id={user_id} />
    </>
  );
}
