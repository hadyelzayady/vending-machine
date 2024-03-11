import { Elysia, t } from "elysia";
import { UserRole } from "../types/UserRole.enum";
import userService from "../services/userService";

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
  return app;
}
