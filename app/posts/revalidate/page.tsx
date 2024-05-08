import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function Page() {
  revalidateTag("posts");
  redirect("/");
}
