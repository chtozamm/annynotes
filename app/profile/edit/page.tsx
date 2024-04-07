import LinkButton from "@/components/LinkButton"
import SignUpForm from "@/components/SignUpForm"
import { redirect } from "next/navigation"
import { getSession } from "@/app/lib"
import UpdateProfileForm from "@/components/UpdateProfileForm"

export default async function Page() {
  const [token, userId, __] = await getSession()
  const user = await fetch(
    (process.env.NEXT_PUBLIC_AUTH_URL + "/records/" + userId) as string,
    {
      headers: {
        Authorization: token,
      },
      next: { tags: ["user"] },
    },
  ).then((res) => res.json())
  return (
    <>
      <h2 className="w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        Edit profile
      </h2>
      {/* <p className="mb-4 text-sm text-zinc-400">Create a new account</p> */}
      <UpdateProfileForm user={user} />
    </>
  )
}
