import { p as prisma } from "../../../chunks/prisma.js";
const load = async () => {
  const stacks = await prisma.tech.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      url: true
    }
  });
  return {
    stacks
  };
};
export {
  load
};
