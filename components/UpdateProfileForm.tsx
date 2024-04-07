"use client"

import { updateUser } from "@/app/actions"
import SubmitButton from "@/components/SubmitButton"
import { useRouter } from "next/navigation"

export default function UpdateProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const handleForm = async (data: FormData) => {
    // const inputEmail = (data.get("email") as string).trim()
    const inputName = (data.get("name") as string).trim()
    const inputUsername = (data.get("username") as string).trim()
    // const inputPassword = (data.get("password") as string).trim()
    // const inputPasswordConfirm = (data.get("password") as string).trim()

    const credentials: UpdateUser = {
      // email: inputEmail,
      username: inputUsername,
      name: inputName,
      id: user.id,
      // password: inputPassword,
      // passwordConfirm: inputPasswordConfirm,
    }

    // console.log(credentials)
    const err = await updateUser(credentials)

    if (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
    <>
      <form
        action={handleForm}
        className="flex w-full max-w-sm flex-col items-center"
        id="postForm">
        {/* <p className="mr-auto mt-8 font-ringbearer text-lg font-bold lowercase text-primary">
          Email
        </p>
        <input
          type="email"
          name="email"
          className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
          placeholder="Email"
          defaultValue={user.email}
          required
        /> */}
        <p className="mr-auto mt-8 font-ringbearer text-lg font-bold lowercase text-primary">
          Username
        </p>
        <p className="mb-4 text-sm text-zinc-400 mr-auto">Used to sign in</p>
        <input
          type="text"
          name="username"
          className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
          placeholder="Username"
          defaultValue={user.username}
          required
        />
        <p className="mr-auto mt-8 font-ringbearer text-lg font-bold lowercase text-primary">
          Name
        </p>
        <p className="mb-4 text-sm text-zinc-400 mr-auto">Used to address you</p>
        <input
          type="text"
          name="name"
          className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
          placeholder="Your name (used to address you)"
          defaultValue={user.name}
          required
        />
        <div className="mt-4 flex w-full flex-col gap-2">
          <SubmitButton innerText="Update" />
          <span className="text-center text-sm text-zinc-400">or</span>
        </div>
      </form>
      <button
        onClick={() => router.back()}
        className="mx-auto mb-8 mt-4 w-full max-w-sm rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
        Cancel
      </button>
    </>

    // <input
    //   type="password"
    //   name="password"
    //   className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
    //   placeholder="Password"
    //   autoComplete="off"
    //   required
    // />
    // <input
    //   type="password"
    //   name="passwordConfirm"
    //   className="mb-4 w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
    //   placeholder="Confirm Password"
    //   autoComplete="off"
    //   required
    // />
  )
}
