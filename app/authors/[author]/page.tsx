import { Suspense } from "react"
import Image from "next/image"
import Posts from "@/components/Posts"
import LinkButton from "@/components/LinkButton"

export default async function Home({
  params: { author },
}: {
  params: { author: string }
}) {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items)

  // Filter posts based on the search params
  const posts = data.filter(
    (post) => post.author.toLowerCase() === author.replaceAll("_", " ") && post.verified,
  )
  return (
    <>
      {/* <LinkButton label="Share" /> */}
      <h2 className="mb-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        {posts.length > 0
          ? `From ${author.charAt(0).toUpperCase() + author.replaceAll("_", " ").slice(1)}:`
          : `${author.replaceAll("_", " ")} hasn't posted anything yet`}
      </h2>
      {data.length > 0 ? (
        <Suspense fallback={<Fallback />}>
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
