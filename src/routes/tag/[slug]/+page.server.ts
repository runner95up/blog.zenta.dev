import { BYPASS_TOKEN } from "$env/static/private";
import { prisma } from "@/lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const config = {
  isr: {
    expiration: 60,
    bypassToken: BYPASS_TOKEN,
  },
};

export const load = (async ({ params }) => {
  const tag = await prisma.tag.findFirst({
    where: {
      id: params.slug,
    },
    select: {
      id: true,
      name: true,
      photo: true,
      description: true,
    },
  });
  return {
    tag,
  };
}) satisfies PageServerLoad;
