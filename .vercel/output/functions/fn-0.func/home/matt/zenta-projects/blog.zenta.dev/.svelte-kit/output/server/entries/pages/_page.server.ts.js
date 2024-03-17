import { p as prisma } from "../../chunks/prisma.js";
const load = async () => {
  const posts = await prisma.post.findMany({});
  return {
    posts
  };
};
export {
  load
};
