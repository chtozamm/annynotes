import LinkButton from "@/components/link-button";
import SignInForm from "@/components/sign-in-form";
import { redirect } from "next/navigation";
import { getSession } from "@/app/actions";

export default async function Page() {
  const { token } = await getSession();
  if (token) redirect("/");
  return (
    <>
      <h2 className="font-ringbearer text-primary mt-2 w-full text-center text-2xl font-bold lowercase">
        Sign In
      </h2>
      <p className="mb-4 text-sm text-zinc-400">
        Sign in with your credentials
      </p>
      <SignInForm />
      <p className="-mt-4 mb-4 text-sm text-zinc-400">or</p>
      <LinkButton href="/signup" secondary={true} label="Sign up" />
    </>
  );
}
