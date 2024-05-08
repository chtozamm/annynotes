"use client";

import { signout } from "@/app/lib";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <form
        action={signout}
        className="flex w-full max-w-sm flex-col items-center gap-4"
      >
        <div className="flex w-full items-center justify-center rounded-xl border border-primary bg-secondary py-4">
          <p className="mx-2 text-center text-sm text-zinc-400">
            Are you sure you want to sign out?
          </p>
          <span className="text-3xl">🦉</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <SubmitButton innerText="Sign out" />
          <span className="text-center text-sm text-zinc-400">or</span>
        </div>
      </form>
      <button
        onClick={() => router.back()}
        className="mx-auto mb-8 mt-4 w-full max-w-sm rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
      >
        Cancel
      </button>
    </>
  );
}
