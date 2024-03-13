import { serial, pgTable, integer, unique } from "drizzle-orm/pg-core";
import { user } from "./user";
import { role } from "./role";

export const userRole = pgTable(
  "user_role",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
    roleId: integer("role_id").references(() => role.id, {
      onDelete: "set null",
    }),
  },
  (t) => ({
    uniqUserIdRoleId: unique().on(t.userId, t.roleId),
  }),
);
