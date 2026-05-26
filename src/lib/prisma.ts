import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return url;
}

export function getPrisma() {
  if (globalThis.__prisma) return globalThis.__prisma;

  const pool = new Pool({ connectionString: getDatabaseUrl() });
  const adapter = new PrismaPg(pool);

  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalThis.__prisma = prisma;
  return prisma;
}

