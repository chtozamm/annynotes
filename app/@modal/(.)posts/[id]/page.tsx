// import data from '/posts'

export default function PostModal({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  // const posts = data
  // const post = posts.find((p) => p.id === postId)
  return <div>post.id: {postId}</div>;
}
