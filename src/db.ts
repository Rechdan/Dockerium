import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const newClient = () => {
  const client = new PrismaClient();
  return client;
};

const db = globalForPrisma.prisma || newClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
