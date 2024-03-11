import { serial, pgTable, varchar, numeric, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }),
  deposite: numeric("deposite"),
  password: text("password"),
});
