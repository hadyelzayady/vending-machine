import type { Config } from "drizzle-kit";

export default {
  schema: "./src/entities/User.ts",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "localhost:5432",
    user: "vendingmachine",
    password: "vendingmachinepassword",
    database: "vendingmachine",
  },
} satisfies Config;
