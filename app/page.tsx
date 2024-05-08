import Posts from "@/components/Posts";
import LinkButton from "@/components/LinkButton";

export default async function Home() {
  const posts: Post[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["posts"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return (
    <>
      <LinkButton label="Share" />
      {posts.length > 0 ? (
        <>
          <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
            {posts.length > 0
              ? "Recent notes:"
              : "Someone has stolen all the notes! Try to reload the page to try to get them back"}
          </h2>
          <Posts posts={posts} />
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

const Error = () => (
  <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
);
