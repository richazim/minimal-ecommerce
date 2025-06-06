import db from "@/db/db"
import { Product } from "@/types/product"

export async function getProductById(id: string): Promise<Product | null> {
  const product = await db.product.findUnique({
    where: { id },
  })
  return product ?? null
}
