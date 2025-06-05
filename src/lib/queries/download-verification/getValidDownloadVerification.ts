import { downloadVerifications } from "@/data/downloadVerifications"
import { products } from "@/data/products"

export async function getValidDownloadVerification(downloadVerificationId: string) {
  const now = new Date()

  // Recherche de la vérification valide
  const verification = downloadVerifications.find(
    (v) => v.id === downloadVerificationId && v.expiresAt > now
  )

  if (!verification) return null

  // Recherche du produit associé
  const product = products.find((p) => p.id === verification.productId)

  if (!product) return null

  return {
    product: {
      filePath: product.filePath,
      name: product.name,
    },
  }
}
