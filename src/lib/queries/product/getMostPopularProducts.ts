
import { cache } from "@/lib/utils/cache"
import db from '@/db/db';

export const getMostPopularProducts = cache(
  async () => {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" }, // ou autre critère de popularité si tu en as
      take: 6,
    })

    return products
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 }
)
