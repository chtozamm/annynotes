"use client";

import { signIn } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

export default function SignInForm() {
  const handleForm = async (data: FormData) => {
    const inputIdentity = (data.get("identity") as string).trim();
    const inputPassword = (data.get("password") as string).trim();

    const credentials: SignInCredentials = {
      identity: inputIdentity,
      password: inputPassword,
    };

    const err = await signIn(credentials);

    if (err) {
      // console.log("Failed posting a note");
      alert(err);
    }
  };

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="postForm"
    >
      <input
        type="email"
        name="identity"
        className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Email"
        autoComplete="off"
        required
      />
      <input
        type="password"
        name="password"
        className="mb-4 w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Password"
        autoComplete="off"
        minLength={8}
        required
      />
      <SubmitButton innerText="Sign In" />
    </form>
  );
}
