import { Elysia } from "elysia";
import { State } from "postgres";
import { ElysiaState } from "../types/State";
import { user } from "../schema";

export function buyerController(app: Elysia) {
  app.get("/buy", ({ store }: { store: ElysiaState }) => {
    const result = store.db.select({ id: user.id }).from(user);
    return result;
  });
  return app;
}
