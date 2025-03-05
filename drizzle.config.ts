import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default {
  schema: "./src/server/db/schema/*",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
