import { validateId } from "@/app/utils"
import UpdateForm from "@/components/UpdateForm"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  if (validateId(id)) {
    const post: Post = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
      cache: "no-store",
    }).then((res) => res.json())

    const cookieStore = cookies()
    const sessionId = cookieStore.get("user_id")?.value as string
    if (sessionId !== post.user) redirect("/")

    if (post.message === "The requested resource wasn't found.") {
      revalidatePath("/")
      redirect("/")
    }

    return <UpdateForm post={post} />
  } else {
    return <p>Invalid id</p>
  }
}
