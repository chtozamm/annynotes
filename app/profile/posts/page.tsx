import { getSession } from "@/app/lib"
import LinkButton from "@/components/LinkButton"
import Posts from "@/components/Posts"

export default async function UserPosts() {
  const data: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] }, cache: "force-cache" },
  )
    .then((res) => res.json())
    .then((data) => data.items)
  const [_, userId, __] = await getSession()
  const posts = data.filter((post) => post.user_id === userId)
  return (
    <>
      {/* <LinkButton label="Share" /> */}
      <h2 className="mb-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        {posts.length > 0 ? "Your notes:" : "You haven't posted anything yet"}
      </h2>
      <Posts posts={posts} />
    </>
  )
}
