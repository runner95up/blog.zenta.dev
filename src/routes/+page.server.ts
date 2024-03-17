import { BYPASS_TOKEN } from "$env/static/private";
import { prisma } from "@/lib/server/prisma";
import type { Config } from "@sveltejs/adapter-vercel";
import type { PageServerLoad } from "./$types";

export const config: Config = {
  isr: {
    expiration: 60,
    bypassToken: BYPASS_TOKEN,
  },
};

export const load = (async () => {
  const posts = await prisma.post.findMany({});
  return {
    posts,
  };
}) satisfies PageServerLoad;
