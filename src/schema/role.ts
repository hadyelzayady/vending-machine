import { pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const role = pgTable("role", {
  id: integer("id").primaryKey(),
  name: varchar("name", {
    length: 50,
    enum: ["BUYER", "SELLER"],
  }),
  //  TODO unique name constraint
});
