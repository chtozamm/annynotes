import { redirect } from "next/navigation";
import { getSession, signout } from "@/app/lib";
import Link from "next/link";

export default async function Profile() {
  const [token, userId, _] = await getSession();
  if (!userId) redirect("/signin");
  const user: User = await fetch(
    (process.env.NEXT_PUBLIC_AUTH_URL + "/records/" + userId) as string,
    {
      headers: {
        Authorization: token,
      },
      next: { tags: ["user"] },
    },
  ).then((res) => res.json());
  // console.log(user)
  return (
    <>
      <div className="mb-8 w-full max-w-sm">
        <h2 className="w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
          Welcome back, {user.name}!
        </h2>
        <p className="text-center text-sm text-zinc-400">
          Credentials used to sign in:
        </p>
        <p className="mr-auto font-ringbearer text-lg font-bold lowercase text-primary">
          Email
        </p>
        <p className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary">
          {user.email}
        </p>
        <p className="mr-auto mt-8 font-ringbearer text-lg font-bold lowercase text-primary">
          Username
        </p>
        <p className="w-full max-w-sm rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary">
          {user.username}
        </p>
      </div>
      <Link
        href={"/profile/edit"}
        className="mx-auto mt-4 inline-flex w-full max-w-sm select-none items-center justify-center rounded-xl bg-primary py-4 text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 disabled:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
      >
        {/* Change credentials */}
        Edit profile
      </Link>
      {/* <Link
        href={"#"}
        className="pointer-events-none mx-auto mt-4 w-full max-w-sm select-none rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary opacity-35 outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
        Change password
      </Link> */}
      <Link
        href={"/signout"}
        className="mx-auto mb-8 mt-4 w-full max-w-sm select-none rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
      >
        Sign out
      </Link>
    </>
  );
}
