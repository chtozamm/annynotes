"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <h2>404</h2>
      <p>Could not find requested page</p>
      <button className="cursor-pointer" onClick={() => router.back()}>
        Return back
      </button>
    </div>
  );
}
