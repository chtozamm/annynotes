import styles from "./page.module.css";
import Form from "./Form";
import { PrismaClient } from "@prisma/client";
import Posts from "./Posts";
import { revalidatePath } from "next/cache";
import Loader from "./Loader";

export default async function Home() {
  // Get posts from database
  async function getPosts() {
    "use server";
    const prisma = new PrismaClient();
    const posts = await prisma.posts.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    revalidatePath("/");
    await prisma.$disconnect();
    return posts;
  }

  // Create new post
  async function createPost(message: string, senderName: string) {
    "use server";
    const prisma = new PrismaClient();
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
  async function deletePost(id: number) {
    "use server";
    const prisma = new PrismaClient();
    await prisma.posts.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    revalidatePath("/");
  }

  // Update post
  async function editPost(id: number, message: string, senderName: string) {
    "use server";
    const prisma = new PrismaClient();
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

  const posts = await getPosts();

  return (
    <main className={styles.container}>
      <Loader />
      <div>
        <h1>Annynotes ✨</h1>
        <p className={styles.description}>
          here you can share a legend <br />
          or leave a note for a loved one
        </p>
      </div>
      <Form createPost={createPost} getPosts={getPosts} />
      <Posts posts={posts} />
    </main>
  );
}
