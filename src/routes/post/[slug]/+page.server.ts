import { BYPASS_TOKEN } from "$env/static/private";
import { prisma } from "@/lib/server/prisma";
import type { Config } from "@sveltejs/adapter-vercel";
import type { PageServerLoad } from "./$types";

export const config: Config = {
  isr: {
    expiration: 43200,
    bypassToken: BYPASS_TOKEN,
  },
};
export const load = (async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      authors: {
        select: {
          name: true,
          photo: true,
        },
      },
      stack: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: true,
      likes: {
        select: {
          id: true,
        },
      },
      dislikes: {
        select: {
          id: true,
        },
      },
    },
  });
  return {
    post,
    likes: post?.likes.length,
    dislikes: post?.dislikes.length,
  };
}) satisfies PageServerLoad;
