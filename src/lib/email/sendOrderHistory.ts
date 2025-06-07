
"use server"

import { z } from "zod"
import db from "@/db/db"
import { generateDownloadLinksForOrders } from "../links/generateDownloadLinksForOrders";
import { sendOrderHistoryEmail } from "./sendOrderHistoryEmail";

const emailSchema = z.string().email()

export async function sendOrderHistory(
  _prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = emailSchema.safeParse(formData.get("email"))
  
  if (!result.success) {
    return { error: "Invalid email address" }
  }

  const user = await db.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          id: true,
          pricePaidInCents: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    return {
      message:
        "Check your email to view your order history and download your products.",
    }
  }

  const ordersWithLinks = await generateDownloadLinksForOrders(user.orders)

  const response = await sendOrderHistoryEmail(user.email, ordersWithLinks)

  console.log(response)

  if (response.error) {
    return {
      error: "There was an error sending your email. Please try again.",
    }
  }

  return {
    message:
      "Check your email to view your order history and download your products.",
  }
}
