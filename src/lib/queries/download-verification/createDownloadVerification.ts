import db from "@/db/db"

export async function createDownloadVerification(productId: string): Promise<string> {
  const now = new Date()

  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24) // 24h plus tard

  const newVerification = await db.downloadVerification.create({
    data: {
      productId,
      createdAt: now,
      expiresAt,
    },
  })

  return newVerification.id
}
