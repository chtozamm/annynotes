import { validateId } from "@/app/utils"
import DeleteForm from "@/components/DeleteForm"
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // const post: Post = await fetch(
  //   process.env.NEXT_PUBLIC_DB_URL + "/" + params.id,
  // ).then((res) => res.json());

  // const cookieStore = cookies();
  // const sessionId = cookieStore.get("user_id")?.value as string;
  // if (sessionId !== post.user) redirect("/");

  if (validateId(params.id)) {
    return <DeleteForm id={params.id} />
  } else {
    return <p>Invalid id</p>
  }
}
