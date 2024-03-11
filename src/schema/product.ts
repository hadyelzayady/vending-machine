import {
  serial,
  pgTable,
  varchar,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  amountAvailable: integer("amount_available"),
  cost: numeric("cost"),
  sellerId: integer("seller_id").references(() => user.id, {
    onDelete: "set null",
  }),
});
