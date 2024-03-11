import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const CONNECTION_STRING =
  "postgres://vendingmachine:vendingmachinepassword@localhost:5432/vendingmachine";

const migrationClient = postgres(CONNECTION_STRING, { max: 1 });
await migrate(drizzle(migrationClient), {
  migrationsFolder: "./drizzle",
});
await migrationClient.end();

// for query purposes
const queryClient = postgres(CONNECTION_STRING);
const db = drizzle(queryClient);
export default db;
