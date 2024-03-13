import {
  serial,
  pgTable,
  varchar,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { MAX_PRODUCT_NAME_LENGTH } from "../constants/namesLength";

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: MAX_PRODUCT_NAME_LENGTH }),
  amountAvailable: integer("amount_available"),
  cost: numeric("cost"),
  sellerId: integer("seller_id").references(() => user.id, {
    onDelete: "set null",
  }),
});
