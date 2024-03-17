import { prisma } from "@/lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await prisma.post.findMany({});
  return {
    posts,
  };
}) satisfies PageServerLoad;
