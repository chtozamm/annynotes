import { getSession } from "@/app/lib";
import ShareForm from "@/components/share-form";

export default async function Page() {
  const [, userId, verified] = await getSession();
  return (
    <>
      <h2 className="font-ringbearer text-primary w-full text-center text-2xl font-bold lowercase">
        New note
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new note</p>
      <ShareForm
        user={{ id: userId, verified: verified === "true" ? true : false }}
      />
    </>
  );
}
