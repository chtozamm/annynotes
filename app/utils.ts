import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

// Get all posts from database
export async function getPosts() {
  "use server";
  const posts = await prisma.posts.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  await prisma.$disconnect();
  revalidatePath("/");
  return posts;
}

// Get a single post from database
export async function getPost(id: number) {
  "use server";
  const posts = await prisma.posts.findFirst({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  revalidatePath("/");
  return posts;
}

// Create new post
export async function createPost(message: string, senderName: string) {
  "use server";
  await prisma.posts.create({
    data: {
      message: message,
      name: senderName,
    },
  });
  await prisma.$disconnect();
  revalidatePath("/");
}

// Delete post
export async function deletePost(id: number) {
  "use server";
  await prisma.posts.delete({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  revalidatePath("/");
}

// Update post
export async function editPost(
  id: number,
  message: string,
  senderName: string
) {
  "use server";
  await prisma.posts.update({
    where: {
      id: id,
    },
    data: {
      message: message,
      name: senderName,
    },
  });
  await prisma.$disconnect();
  revalidatePath("/");
}

// Get all posts from a sender
export async function getSenderPosts(senderName: string) {
  "use server";
  let posts;
  if (senderName.includes("Jack Sparrow")) {
    posts = await prisma.posts.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      where: {
        name: {
          contains: "Jack Sparrow",
        },
      },
    });
  } else {
    posts = await prisma.posts.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      where: {
        name: senderName,
      },
    });
  }

  await prisma.$disconnect();
  revalidatePath("/");
  return posts;
}
