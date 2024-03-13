import { and, eq, inArray } from "drizzle-orm";
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

async function updateUser(
  userId: number,
  payload: { roles?: UserRole[]; username?: string },
) {
  return db.transaction(async (tx) => {
    const currentUsers = await tx
      .select({ id: user.id, username: user.username })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (currentUsers.length !== 1) {
      throw new Error("User not found");
    }
    const currentUser = currentUsers[0];
    if (payload.username) {
      currentUser.username = payload.username;
      tx.update(user).set(currentUser).where(eq(user.id, userId));
    }
    if (payload.roles) {
      const oldRoles = await tx
        .select()
        .from(userRole)
        .where(eq(userRole.userId, userId));
      const oldRoleIds = oldRoles.map((r) => r.roleId as number);
      const addedRoleIds = payload.roles.filter((r) => !oldRoleIds.includes(r));
      const removedRoleIds = oldRoleIds.filter(
        (r) => !payload.roles?.includes(r),
      );
      await tx
        .delete(userRole)
        .where(
          and(
            inArray(userRole.roleId, removedRoleIds),
            eq(userRole.userId, userId),
          ),
        );
      await tx.insert(userRole).values(
        addedRoleIds.map((r) => ({
          userId: userId,
          roleId: r,
        })),
      );
    }

    return currentUser;
  });
}

async function deleteUser(userId: number) {
  return db.transaction(async (tx) => {
    const deletedUser = await tx
      .delete(user)
      .where(eq(user.id, userId))
      .returning({ id: user.id, username: user.username });
    if (deleteUser.length !== 1) {
      throw new Error("User not found");
    }
    return deletedUser[0];
  });
}

export default {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
