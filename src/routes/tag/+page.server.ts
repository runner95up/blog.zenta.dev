import { prisma } from "@/lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      photo: true,
    },
  });
  return {
    tags,
  };
}) satisfies PageServerLoad;
