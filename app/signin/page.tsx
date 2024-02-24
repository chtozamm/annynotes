import LinkButton from "@/components/LinkButton"
import SignInForm from "@/components/SignInForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Page() {
  const cookieStore = cookies()
  const session = cookieStore.has("token")
  if (session) redirect("/")
  return (
    <>
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        Welcome back!
      </h2>
      <p className="mb-4 text-sm text-zinc-400">
        Sign in with your credentials
      </p>
      <SignInForm />
      <p className="-mt-4 mb-4 text-sm text-zinc-400">or</p>
      <LinkButton href="/signup" secondary={true} label="Sign up" />
    </>
  )
}
