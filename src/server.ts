import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import app from "./app";

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
