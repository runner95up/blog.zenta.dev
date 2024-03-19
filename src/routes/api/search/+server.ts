import { prisma } from "@/lib/server/prisma";
import type { RequestHandler } from "./$types";

async function getPostByQuery(query: string) {
  return await prisma.post.findMany({
    select: {
      title: true,
      summary: true,
      slug: true,
      updatedAt: true,
      cover: true,
    },
  });
  // return await prisma.$queryRaw<{
  //   title: string;
  //   slug: string;
  //   cover: string;
  // }>`SELECT * FROM "Post" WHERE "title" LIKE ${query}`;
}

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get("query");

  if (!query) {
    return new Response("Invalid request", { status: 400 });
  }
  const post = await getPostByQuery(query);
  console.log(post);
  return new Response(JSON.stringify(post), {
    headers: { "content-type": "application/json" },
  });
};

export function POST() {}
