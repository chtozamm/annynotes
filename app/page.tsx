import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Posts from "./Posts";

export default async function Home() {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return (
    <>
      <ShareButton />
      {data.length > 0 ? (
        <Suspense fallback={<Fallback />}>
          <Posts data={data} />
        </Suspense>
      ) : (
        <Error />
      )}
    </>
  );
}

const ShareButton = () => (
  <Link
    href={"/posts/new"}
    className="mx-auto w-full max-w-sm rounded-xl bg-[#ffb220] py-4 text-center text-[0.75em] font-black uppercase text-white outline-none focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4"
  >
    Share
  </Link>
);

const Fallback = () => (
  <>
    <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
      Looking for notes...
    </h2>
    <ul className="w-full">
      {[0, 1, 2].map((_, i) => (
        <li
          key={i}
          className="relative mb-8 h-48 whitespace-pre-wrap break-words rounded-2xl border-t-2 border-[#ffb220] bg-[#fffbf7] px-4 pb-8 pt-4 text-center leading-6 md:px-8"
        >
          <Image
            className="absolute left-[calc(50%-12px)] top-[-0.9em]"
            src="/icons/scroll.svg"
            width={26}
            height={26}
            alt="scroll icon"
          />
        </li>
      ))}
    </ul>
  </>
);

const Error = () => (
  <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
);
