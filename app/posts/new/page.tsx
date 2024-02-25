import { getSession } from "@/app/lib"
import ShareForm from "@/components/ShareForm"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getSession()
  if (session == null) redirect("/signin")
  return (
    <>
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        New note
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new note</p>
      <ShareForm />
    </>
  )
}
