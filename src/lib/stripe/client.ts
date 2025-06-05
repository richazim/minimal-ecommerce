// src/lib/stripe/client.ts
import { loadStripe } from "@stripe/stripe-js"

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

// client.ts pour signaler que les fonctions de client.ts s'exécute que sur le client
