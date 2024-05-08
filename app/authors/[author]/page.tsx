import Posts from "@/components/Posts";
import LinkButton from "@/components/LinkButton";

// Return a list of `params` to populate the [author] dynamic segment
export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);

  return posts.map((post) => ({
    author: post.author.toLowerCase().replaceAll(" ", "_"),
  }));
}

export default async function Home({
  params: { author },
}: {
  params: { author: string };
}) {
  const authorName = author.replaceAll("_", " "); // formatted name
  const posts: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) =>
      (data.items as Post[]).filter(
        (post) => post.author.toLowerCase() === authorName,
      ),
    );
  return (
    <>
      <LinkButton label="Share" />
      <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        {posts.length > 0
          ? `From ${authorName}:`
          : `${authorName} hasn't posted anything yet`}
      </h2>
      <Posts posts={posts} />
    </>
  );
}
