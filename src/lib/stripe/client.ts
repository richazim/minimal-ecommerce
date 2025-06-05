// src/lib/stripe/client.ts
import { loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

// client.ts pour signaler que les fonctions de client.ts s'exécute que sur le client

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
