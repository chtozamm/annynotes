import { getUserId } from "@/app/lib"
import { validateId } from "@/app/utils"
import UpdateForm from "@/components/UpdateForm"
import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  if (validateId(id)) {
    const post: Post = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
      cache: "no-store",
    }).then((res) => res.json())

    const userId = await getUserId()
    if (userId !== post.user_id) redirect("/")

    if (post.message === "The requested resource wasn't found.") {
      revalidateTag("posts")
      redirect("/")
    }

    return <UpdateForm post={post} />
  } else {
    return <p>Invalid id</p>
  }
}
