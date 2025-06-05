import { Button } from "@/components/ui/button"
import { createDownloadVerification } from "@/lib/queries/download-verification/createDownloadVerification"
import { getProductById } from "@/lib/queries/product/getProductById"
import { getPaymentIntent } from "@/lib/stripe/getPaymentIntent"
import { formatCurrency } from "@/lib/utils/format"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await getPaymentIntent(searchParams.payment_intent)
  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await getProductById(paymentIntent.metadata.productId)
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(
                  product.id
                )}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Page de succès que stripe appelle une fois l'achat a été bien effectué