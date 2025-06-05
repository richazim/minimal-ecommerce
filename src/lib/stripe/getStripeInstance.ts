"use server"

import Stripe from "stripe"

export const getStripeInstance = async () => {
    return new Stripe(process.env.STRIPE_SECRET_KEY as string)
}
