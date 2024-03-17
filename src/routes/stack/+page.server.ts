import { prisma } from "@/lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const stacks = await prisma.tech.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      url: true,
    },
  });
  return {
    stacks,
  };
}) satisfies PageServerLoad;
