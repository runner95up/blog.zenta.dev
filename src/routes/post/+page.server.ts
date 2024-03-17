import { prisma } from "@/lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      summary: true,
      cover: true,
    },
  });

  return {
    posts,
  };
}) satisfies PageServerLoad;
