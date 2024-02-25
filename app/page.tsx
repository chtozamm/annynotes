import { Suspense } from "react"
import Image from "next/image"
import Posts from "@/components/Posts"
import LinkButton from "@/components/LinkButton"

export default async function Home() {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items)

  const posts = data

  return (
    <>
      <LinkButton label="Share" />
      {data.length > 0 ? (
        <Suspense fallback={<Fallback />}>
          <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
            {posts.length > 0
              ? "Recent notes:"
              : "Someone has stolen all the notes! Try to reload the page to try to get them back"}
          </h2>
          <Posts posts={posts} />
        </Suspense>
      ) : (
        <Error />
      )}
    </>
  )
}

const Fallback = () => (
  <>
    <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
      Looking for notes...
    </h2>
    <ul className="w-full">
      {[0, 1, 2].map((_, i) => (
        <li
          key={i}
          className="relative mb-8 h-48 whitespace-pre-wrap break-words rounded-2xl border-t-2 border-primary bg-secondary px-4 pb-8 pt-4 text-center leading-6 lg:px-8">
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
)

const Error = () => (
  <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
)
