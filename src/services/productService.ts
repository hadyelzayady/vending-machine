import { eq } from "drizzle-orm";
import db from "../db";
import { product } from "../schema";

async function getProductById(productId: number) {
  const productResult = await db
    .select()
    .from(product)
    .where(eq(product.id, productId))
    .limit(1);

  if (productResult.length === 0) {
    throw new Error("User not found");
  }
  return productResult[0];
}

export default {
  getProductById,
};
