import { Elysia } from "elysia";

export function sellerController(app: Elysia) {
  app.get("/", () => {});
  return app;
}
