import { eq } from "drizzle-orm";
import db from "../db";
import { user, userRole } from "../schema";
import { UserRole } from "../types/UserRole.enum";

function addUser(payload: {
  username: string;
  password: string;
  roles: UserRole[];
}) {
  return db.transaction(async (tx) => {
    try {
      const userIds = await tx
        .insert(user)
        .values({
          username: payload.username,
          password: payload.password,
        })
        .returning({ id: user.id });

      if (userIds.length !== 1) {
        throw new Error("Unexptected result");
      }
      const userId = userIds[0].id;
      for (const role of payload.roles) {
        await tx
          .insert(userRole)
          .values({
            userId: userId,
            roleId: role,
          })
          .returning({ id: userRole.id });
      }
      return { userId: userId };
    } catch (ex) {}
  });
}

async function getUser(userId: number): Promise<{
  id: number;
  username: string | null;
}> {
  const userResult = await db
    .select({ id: user.id, username: user.username })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (userResult.length === 0) {
    throw new Error("User not found");
  }
  return userResult[0];
}

export default {
  addUser,
  getUser,
};
