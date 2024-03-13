import { Elysia } from "elysia";
import { PRODUCT_QUERY_PARAM_REQUEST_SCHEMA } from "../dtos/request/productRequests";

export function productController(app: Elysia) {
  app.get(
    "/product/:productId",
    ({ params: { productId } }) => {
      const product = productService.getProduct(productId);
      return product;
    },
    PRODUCT_QUERY_PARAM_REQUEST_SCHEMA,
  );
  return app;
}
