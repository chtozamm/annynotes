import Posts from "./Posts";
import ShareForm from "./ShareForm";

export default async function Home() {
  return (
    <>
      <ShareForm />
      <Posts />
    </>
  );
}
