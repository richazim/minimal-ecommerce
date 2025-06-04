import { cache } from "@/lib/utils/cache"
import { products } from "@/data/products"

export const getProducts = cache(
  async () => {
    return products
      .filter(product => product.isAvailableForPurchase)
      .sort((a, b) => a.name.localeCompare(b.name))
  },
  ["/products", "getProducts"]
)
