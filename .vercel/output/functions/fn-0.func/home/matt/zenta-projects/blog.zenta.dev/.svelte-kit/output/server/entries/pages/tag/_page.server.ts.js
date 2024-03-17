import { p as prisma } from "../../../chunks/prisma.js";
const load = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      photo: true
    }
  });
  return {
    tags
  };
};
export {
  load
};
