import { products } from "@/data/products"
import { cache } from "@/lib/utils/cache"

export const getMostPopularProducts = cache(
  async () => {

    return products
      .filter(product => product.isAvailableForPurchase)
      .slice(0, 6)
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 }
)

