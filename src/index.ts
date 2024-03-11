import { Elysia } from "elysia";
import { buyerController } from "./api/buyercontroller";
import { sellerController } from "./api/sellerController";
import db from "./db";
import swagger from "@elysiajs/swagger";
import { userController } from "./api/userController";

const app = new Elysia()
  .state("db", db)
  .use(swagger())
  .use(buyerController)
  .use(sellerController)
  .use(userController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
