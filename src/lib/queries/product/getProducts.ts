import db from "@/db/db"
import { cache } from "@/lib/utils/cache"

export const getProducts = cache(
  async () => {
    return await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    })
  },
  ["/products", "getProducts"],
  { revalidate: 60 }
)
