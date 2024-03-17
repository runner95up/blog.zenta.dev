import { BYPASS_TOKEN } from "$env/static/private";
import { prisma } from "@/lib/server/prisma";
import { type Config } from "@sveltejs/adapter-vercel";
import type { PageServerLoad } from "./$types";

export const config: Config = {
  isr: {
    expiration: 60,
    bypassToken: BYPASS_TOKEN,
  },
};

export const load = (async ({ params }) => {
  const stack = await prisma.tech.findFirst({
    where: {
      id: params.slug,
    },
    select: {
      id: true,
      name: true,
      logo: true,
      url: true,
      description: true,
      founder: true,
    },
  });
  return {
    stack,
  };
}) satisfies PageServerLoad;
