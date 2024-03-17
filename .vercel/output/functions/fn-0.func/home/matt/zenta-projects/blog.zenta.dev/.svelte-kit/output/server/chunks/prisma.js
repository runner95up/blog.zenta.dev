import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pkg from "pg";
const DATABASE_URL = "postgres://postgres.zuumrnqltcgstumyeanv:KnBqYI4y0qCr9Trn@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";
const BYPASS_TOKEN = "2ad5rEbuxXzojt4SBpu33IpMTP+Gbr2Vg6UNpnsum4M=";
const { Pool } = pkg;
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
export {
  BYPASS_TOKEN as B,
  prisma as p
};
