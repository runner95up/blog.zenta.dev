import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export { prisma };

export * from "./post";
export * from "./tag";
export * from "./tech";
