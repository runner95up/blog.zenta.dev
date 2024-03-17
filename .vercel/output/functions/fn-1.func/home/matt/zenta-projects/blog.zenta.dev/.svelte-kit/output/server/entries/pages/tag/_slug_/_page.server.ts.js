import { B as BYPASS_TOKEN, p as prisma } from "../../../../chunks/prisma.js";
import "@sveltejs/adapter-vercel";
const config = {
  isr: {
    expiration: 60,
    bypassToken: BYPASS_TOKEN
  }
};
const load = async ({ params }) => {
  const tag = await prisma.tag.findFirst({
    where: {
      id: params.slug
    },
    select: {
      id: true,
      name: true,
      photo: true,
      description: true
    }
  });
  return {
    tag
  };
};
export {
  config,
  load
};
