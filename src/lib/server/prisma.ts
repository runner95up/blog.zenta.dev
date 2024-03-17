import { DATABASE_URL } from "$env/static/private";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
