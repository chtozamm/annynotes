// import { getSession } from "@/app/lib";
import Header from "@/components/Header";
import ShareForm from "./ShareForm";

export default async function Page() {
  // const [_, userId, verified] = await getSession();
  return (
    <>
      <Header />
      <h2 className="w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        New note
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new note</p>
      <ShareForm
      // user={{ id: userId, verified: verified === "true" ? true : false }}
      />
    </>
  );
}
