import { Elysia } from "elysia";
import { buyerController } from "./api/buyercontroller";
import { sellerController } from "./api/sellerController";

const app = new Elysia()
  .use(buyerController)
  .use(sellerController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
