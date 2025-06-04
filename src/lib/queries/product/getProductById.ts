import { products } from "@/data/products"
import { sleep } from "@/lib/utils/sleep"
import { Product } from "@/types/product"

export async function getProductById(id: string): Promise<Product | null> {
    await sleep(2000)
  return products.find(product => product.id === id) ?? null
}
