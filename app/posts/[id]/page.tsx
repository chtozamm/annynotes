import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import Posts from "@/components/Posts"
import LinkButton from "@/components/LinkButton"
// import { getSession } from "@/app/lib"

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items)

  return data.map((post) => ({
    id: post.id as string,
  }))
}

export default async function Home({
  params: { id },
}: {
  params: { id: string }
}) {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items)

  // Filter posts based on the search params
  const posts = data.filter((post) => post.id === id)

  // const [_, userId, __] = await getSession()
  return (
    <>
      <LinkButton label="Share" />
      {data.length > 0 ? (
        <Suspense fallback={<Fallback />}>
          {id && posts[0]?.id ? (
            <>
              <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
                Selected note:
              </h2>
              <Posts posts={posts} />
              {/* {userId === posts[0]?.user_id && ( */}
              <div className="flex w-full flex-col gap-4">
                <Link
                  href={`/posts/edit/${id}`}
                  className="mx-auto w-full max-w-sm rounded-xl bg-primary py-4 text-center text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
                  Edit
                </Link>
                <Link
                  href={`/posts/delete/${id}`}
                  className="mx-auto w-full max-w-sm rounded-xl border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
                  Delete
                </Link>
              </div>
              {/* )} */}
            </>
          ) : (
            <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
              Note doesn&apos;t exist
            </h2>
          )}
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
