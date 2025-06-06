import db from "@/db/db"

export async function generateDownloadLinksForOrders(orders: {
  id: string
  product: { id: string }
}[]) {
  return Promise.all(
    orders.map(async (order) => {
      const verification = await db.downloadVerification.create({
        data: {
          productId: order.product.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        },
      })

      return {
        ...order,
        downloadVerificationId: verification.id,
      }
    })
  )
}
