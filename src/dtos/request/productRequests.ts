import { t } from "elysia";

export const PRODUCT_QUERY_PARAM_REQUEST_SCHEMA = {
  params: t.Object({
    productId: t.Numeric(),
  }),
} as const;
