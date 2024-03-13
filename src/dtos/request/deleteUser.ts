import { t } from "elysia";

export const DELETE_USER_REQUEST_SCHEMA = {
  params: t.Object({
    userId: t.Numeric(),
  }),
} as const;
