"use client";

import { signUp } from "@/app/actions";
import { SignUpCredentials } from "@/app/types";
import SubmitButton from "@/components/submit-button";

export default function SignUpForm() {
  const handleForm = async (data: FormData) => {
    const inputEmail = (data.get("email") as string).trim();
    const inputPassword = (data.get("password") as string).trim();
    const inputPasswordConfirm = (data.get("passwordConfirm") as string).trim();

    if (inputPassword !== inputPasswordConfirm) {
      alert("Passwords don't match");
      return;
    } else {
      const credentials: SignUpCredentials = {
        email: inputEmail,
        password: inputPassword,
        passwordConfirm: inputPasswordConfirm,
        emailVisibility: true,
      };

      const err = await signUp(credentials);

      if (err) {
        alert(err);
      }
    }
  };

  return (
    <form
      action={handleForm}
      className="mb-8 flex w-full max-w-sm flex-col items-center gap-4"
      id="noteForm"
    >
      <input
        type="email"
        name="email"
        className="border-primary lg:focus-visible:bg-secondary lg:focus-visible:shadow-secondary w-full max-w-sm rounded-xl border-t-2 px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:shadow-md"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        className="border-primary lg:focus-visible:bg-secondary lg:focus-visible:shadow-secondary w-full max-w-sm rounded-xl border-t-2 px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:shadow-md"
        placeholder="Password"
        autoComplete="off"
        minLength={8}
        required
      />
      <input
        type="password"
        name="passwordConfirm"
        className="border-primary lg:focus-visible:bg-secondary lg:focus-visible:shadow-secondary mb-4 w-full max-w-sm rounded-xl border-t-2 px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:shadow-md"
        placeholder="Confirm Password"
        autoComplete="off"
        minLength={8}
        required
      />
      <SubmitButton innerText="Sign up" />
    </form>
  );
}
