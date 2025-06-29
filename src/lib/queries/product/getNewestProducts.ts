import db from "@/db/db"
import { cache } from "@/lib/utils/cache"

export const getNewestProducts = cache(
  async () => {
    return await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 }
)
