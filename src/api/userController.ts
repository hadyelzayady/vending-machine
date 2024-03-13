import { Elysia, t } from "elysia";
import { UserRole } from "../types/UserRole.enum";
import userService from "../services/userService";
import {
  UPDATE_USER_REQUEST_SCHEMA,
  DELETE_USER_REQUEST_SCHEMA,
} from "../dtos/request/userRequests";

export function userController(app: Elysia) {
  app.post(
    "/user",
    ({ body }) => {
      console.log("body", body);
      const user = userService.addUser(body);
      return user;
    },
    {
      body: t.Object({
        username: t.String({ maxLength: 100 }),
        password: t.String(),
        roles: t.Array(t.Enum(UserRole)),
      }),
    },
  );

  app.get(
    "/user/:userId",
    ({ params: { userId } }) => {
      const user = userService.getUser(userId);
      return user;
    },
    {
      params: t.Object({
        userId: t.Numeric(),
      }),
    },
  );

  app.put(
    "/user/:userId",
    async ({ params: { userId }, body }) => {
      const user = await userService.updateUser(userId, body);
      return user;
    },
    UPDATE_USER_REQUEST_SCHEMA,
  );

  app.delete(
    "/user/:userId",
    async ({ params: { userId } }) => {
      const user = await userService.deleteUser(userId);
      return user;
    },
    DELETE_USER_REQUEST_SCHEMA,
  );
  return app;
}
