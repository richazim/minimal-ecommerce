import db from "@/db/db"

export async function getValidDownloadVerification(downloadVerificationId: string) {
  const now = new Date()

  const verification = await db.downloadVerification.findFirst({
    where: {
      id: downloadVerificationId,
      expiresAt: { gt: now },
    },
    select: {
      product: {
        select: {
          filePath: true,
          name: true,
        },
      },
    },
  })

  if (!verification) return null

  return {
    product: verification.product,
  }
}
