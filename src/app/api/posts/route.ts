import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch(
    "https://annynotes.pockethost.io/api/collections/posts/records?perPage=500",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json()

  revalidatePath("/")

  return NextResponse.json(data.items.reverse())
}
