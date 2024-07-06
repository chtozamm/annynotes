"use client";
// import { signUp } from "@/lib/actions";
import SubmitButton from "@/components/SubmitButton";

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
      };

      // const err = await signUp(credentials);

      // if (err) {
      //   alert(err);
      // }
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
        name="email"
        className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Password"
        autoComplete="off"
        minLength={8}
        required
      />
      <input
        type="password"
        name="passwordConfirm"
        className="mb-4 w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
        placeholder="Confirm Password"
        autoComplete="off"
        minLength={8}
        required
      />
      <SubmitButton innerText="Sign up" />
    </form>
  );
}
