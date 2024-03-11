import { Elysia } from "elysia";

export function sellerController(app: Elysia) {
  app.get("/sell", () => {});
  return app;
}
