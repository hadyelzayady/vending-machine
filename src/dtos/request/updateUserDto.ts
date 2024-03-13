import { t } from "elysia";
import { UserRole } from "../../types/UserRole.enum";
import { MAX_USERNAME_LENGTH } from "../../constants/namesLength";

export const UPDATE_USER_REQUEST_SCHEMA = {
  params: t.Object({
    userId: t.Numeric(),
  }),
  body: t.Object({
    username: t.Optional(t.String({ maxLength: MAX_USERNAME_LENGTH })),
    roles: t.Optional(t.Array(t.Enum(UserRole))),
  }),
} as const;
