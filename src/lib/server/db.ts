import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { Pool } from "pg";
import { options } from "./auth";

const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter }) ;

export { prisma };
 