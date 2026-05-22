import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL is missing");
}

const prismaClient = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

export default prismaClient;
