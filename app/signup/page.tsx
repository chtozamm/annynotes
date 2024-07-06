import LinkButton from "@/components/LinkButton";
import SignUpForm from "./SignUpForm";
import Header from "../../components/Header";
// import { redirect } from "next/navigation";
// import { getSession } from "@/lib";

export default async function Page() {
  // const [token, _, __] = await getSession();
  // if (token) redirect("/");
  return (
    <>
      <Header />
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        Sign Up
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Create a new account</p>
      <SignUpForm />
      <p className="-mt-4 mb-4 text-sm text-zinc-400">or</p>
      <LinkButton href="/signin" secondary={true} label="Sign In" />
    </>
  );
}
