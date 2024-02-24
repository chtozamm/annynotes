import ShareForm from "@/components/ShareForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Page() {
  const cookieStore = cookies()
  const session = cookieStore.has("token")
  if (!session) redirect("/signin")
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
