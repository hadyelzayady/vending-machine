import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  schemaFilter: "public",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "localhost:5432",
    user: "vendingmachine",
    password: "vendingmachinepassword",
    database: "vendingmachine",
  },
} satisfies Config;
