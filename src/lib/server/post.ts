"use server";
import { ItemMeta } from "@/types";
import { prisma } from ".";

export async function getMetaPosts({ limit = 5, page = 1 }) {
  const res = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      cover: true,
      summary: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: limit * (page - 1),
    take: limit,
  });

  const posts: ItemMeta[] = res.map((post) => {
    return {
      id: post.slug,
      name: post.title,
      photo: post.cover,
      description: post.summary,
      updatedAt: post.updatedAt,
    };
  });

  return posts;
}

export const getAllMetaPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      cover: true,
      summary: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return posts;
};

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return post;
}