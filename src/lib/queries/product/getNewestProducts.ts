import { cache } from "@/lib/utils/cache"
import { products } from "@/data/products"

export const getNewestProducts = cache(
  async () => {
    return products
      .filter(product => product.isAvailableForPurchase)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6)
  },
  ["/", "getNewestProducts"]
)
