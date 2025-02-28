import LinkButton from "@/components/link-button";
import SignUpForm from "@/components/sign-up-form";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib";

export default async function Page() {
  const [token] = await getSession();
  if (token) redirect("/");
  return (
    <>
      <h2 className="font-ringbearer text-primary mt-2 w-full text-center text-2xl font-bold lowercase">
        Sign Up
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new account</p>
      <SignUpForm />
      <p className="-mt-4 mb-4 text-sm text-zinc-400">or</p>
      <LinkButton href="/signin" secondary={true} label="Sign In" />
    </>
  );
}
