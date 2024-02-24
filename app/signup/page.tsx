import LinkButton from "@/components/LinkButton"
import SignUpForm from "@/components/SignUpForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Page() {
  const cookieStore = cookies()
  const session = cookieStore.has("token")
  if (session) redirect("/")
  return (
    <>
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        Sign up
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new account</p>
      <SignUpForm />
      <p className="-mt-4 mb-4 text-sm text-zinc-400">or</p>
      <LinkButton href="/signin" secondary={true} label="Login" />
    </>
  )
}
