import { getStripeInstance } from "./getStripeInstance";


export async function getPaymentIntent(id: string) {
  return (await getStripeInstance()).paymentIntents.retrieve(id)
}
