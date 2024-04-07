"use server";
import { ItemMeta } from "@/types";
import { prisma } from ".";

export async function getMetaTechs({ limit = 5, page = 1 }) {
  const res = await prisma.tech.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      description: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: limit * (page - 1),
    take: limit,
  });

  const techs: ItemMeta[] = res.map((tech) => {
    return {
      id: tech.id,
      name: tech.name,
      photo: tech.logo,
      description: tech.description,
      updatedAt: tech.updatedAt,
    };
  });

  return techs;
}

export const getAllMetaTechs = async () => {
  const techs = await prisma.tech.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      description: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return techs;
};

export async function getTechById(id: string) {
  const tech = await prisma.tech.findUnique({
    where: {
      id,
    },
  });

  return tech;
}
