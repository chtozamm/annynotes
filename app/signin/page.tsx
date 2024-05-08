import LinkButton from "@/components/LinkButton";
import SignInForm from "@/components/SignInForm";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib";

export default async function Page() {
  const [token, _, __] = await getSession();
  if (token) redirect("/");
  return (
    <>
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
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
