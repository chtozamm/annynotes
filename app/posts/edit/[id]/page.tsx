import { validateId } from "@/app/utils";
import UpdateForm from "./UpdateForm";

export default async function Page({ params }: { params: { id: string } }) {
  if (validateId(params.id)) {
    const post: Post = await fetch(
      process.env.NEXT_PUBLIC_DB_URL + "/" + params.id,
      { cache: "no-store" },
    ).then((res) => res.json());

    return <UpdateForm post={post} />;
  } else {
    return <p>Invalid id</p>;
  }
}
