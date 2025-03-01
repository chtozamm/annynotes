import { validateId } from "@/app/utils";
import DeleteForm from "@/components/delete-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (validateId(id)) {
    return <DeleteForm id={id} />;
  } else {
    return <p>Invalid note id</p>;
  }
}
