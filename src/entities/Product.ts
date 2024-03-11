import { index, serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 256 }),
  },
  (users) => ({
    nameIdx: index("name_idx").on(users.fullName),
  }),
);
