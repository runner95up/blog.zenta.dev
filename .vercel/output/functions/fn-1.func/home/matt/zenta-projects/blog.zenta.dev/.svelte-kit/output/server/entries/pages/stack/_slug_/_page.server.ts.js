import { B as BYPASS_TOKEN, p as prisma } from "../../../../chunks/prisma.js";
import "@sveltejs/adapter-vercel";
const config = {
  isr: {
    expiration: 60,
    bypassToken: BYPASS_TOKEN
  }
};
const load = async ({ params }) => {
  const stack = await prisma.tech.findFirst({
    where: {
      id: params.slug
    },
    select: {
      id: true,
      name: true,
      logo: true,
      url: true,
      description: true,
      founder: true
    }
  });
  return {
    stack
  };
};
export {
  config,
  load
};
