import { logout } from "../lib"

export default async function Page() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  )
}
