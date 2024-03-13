import {
  serial,
  pgTable,
  varchar,
  numeric,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { MAX_USERNAME_LENGTH } from "../constants/namesLength";

export const user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: MAX_USERNAME_LENGTH }),
    deposite: numeric("deposite"),
    password: text("password"),
  },
  (t) => ({
    uniqUsername: unique().on(t.username),
  }),
);
