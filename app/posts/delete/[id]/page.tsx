import { validateId } from "@/app/utils";
import DeleteForm from "./DeleteForm";

export default async function Page({ params }: { params: { id: string } }) {
  if (validateId(params.id)) {
    return <DeleteForm id={params.id} />;
  } else {
    return <p>Invalid id</p>;
  }
}
