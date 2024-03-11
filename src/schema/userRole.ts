import { serial, pgTable, integer } from "drizzle-orm/pg-core";
import { user } from "./user";
import { role } from "./role";

export const userRole = pgTable("user_role", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => user.id),
  roleId: integer("role_id").references(() => role.id),
});
