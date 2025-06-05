import { stripe } from "./client"

export async function getPaymentIntent(id: string) {
  return stripe.paymentIntents.retrieve(id)
}
