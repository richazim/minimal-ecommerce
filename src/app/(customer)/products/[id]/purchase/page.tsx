import { notFound } from "next/navigation"
import Stripe from "stripe"
import { getProductById } from "@/lib/queries/product/getProductById"
import { CheckoutForm } from "@/components/Checkout/CheckoutForm"

export const dynamic = "force-dynamic" // Cela dit à Next.js : « ne pré-rends pas cette page, c’est toujours dynamique ».

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await getProductById(id)
  if (product == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent")
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
