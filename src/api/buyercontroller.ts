import { Elysia } from "elysia";

export function buyerController(app: Elysia) {
  app.get("/", () => {});
  return app;
}
