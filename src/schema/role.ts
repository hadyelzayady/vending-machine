import { pgTable, varchar, integer, unique } from "drizzle-orm/pg-core";
import { MAX_ROLE_NAME_LENGTH } from "../constants/namesLength";

export const role = pgTable(
  "role",
  {
    id: integer("id").primaryKey(),
    name: varchar("name", {
      length: MAX_ROLE_NAME_LENGTH,
      enum: ["BUYER", "SELLER"],
    }),
  },
  (t) => ({
    uniqRoleName: unique().on(t.name),
  }),
);
