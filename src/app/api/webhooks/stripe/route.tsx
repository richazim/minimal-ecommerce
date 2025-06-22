import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
// import { Resend } from "resend"
import PurchaseReceiptEmail from "@/components/Email/PurchaseReceiptEmail"
import { render } from "@react-email/render"
import { sendEmail } from "@/actions/email/sendEmail"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
// const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {

  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  )
 
  if (event.type === "charge.succeeded") {
    const charge = event.data.object
    const productId = charge.metadata.productId
    const email = charge.billing_details.email
    const pricePaidInCents = charge.amount

    const product = await db.product.findUnique({ where: { id: productId } })
    
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 })
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents } },
    }
    
    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    })

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
    
    const reactComponent = (
      <PurchaseReceiptEmail
          order={order}
          product={product}
          downloadVerificationId={downloadVerification.id}
        />
    )

    const htmlContent = await render(reactComponent);

    // await resend.emails.send({
    //   from: `Support <${process.env.SENDER_EMAIL}>`,
    //   to: email,
    //   subject: "Order Confirmation",
    //   react: (
    //     <PurchaseReceiptEmail
    //       order={order}
    //       product={product}
    //       downloadVerificationId={downloadVerification.id}
    //     />
    //   ),
    // })

    await sendEmail({
      to: email,
      subject: "Order Confirmation",
      text: "To see the order confirmation, please activate the html version of this email.",
      html: htmlContent
    })
  }

  return new NextResponse()
}

// Les fichiers API dans le App Router (route.ts) sont exécutés côté serveur pur, et ne supportent pas directement le JSX (ce n’est pas un composant React, mais une fonction handler HTTP).