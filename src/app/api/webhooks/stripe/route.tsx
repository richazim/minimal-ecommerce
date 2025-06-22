import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import PurchaseReceiptEmail from "@/components/Email/PurchaseReceiptEmail";
import { render } from "@react-email/render";
import { sendEmail } from "@/actions/email/sendEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new NextResponse("Missing stripe-signature header", { status: 400 });
    }

    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    try {
      const charge = event.data.object as Stripe.Charge;
      const productId = charge.metadata.productId;
      const email = charge.billing_details.email;
      const pricePaidInCents = charge.amount;

      if (!productId || !email) {
        return new NextResponse("Missing productId or email in charge metadata", { status: 400 });
      }

      const product = await db.product.findUnique({ where: { id: productId } });
      if (!product) {
        return new NextResponse("Product not found", { status: 404 });
      }

      const userFields = {
        email,
        orders: { create: { productId, pricePaidInCents } },
      };

      const {
        orders: [order],
      } = await db.user.upsert({
        where: { email },
        create: userFields,
        update: userFields,
        select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
      });

      const downloadVerification = await db.downloadVerification.create({
        data: {
          productId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      const reactComponent = (
        <PurchaseReceiptEmail
          order={order}
          product={product}
          downloadVerificationId={downloadVerification.id}
        />
      );

      const htmlContent = await render(reactComponent);

      await sendEmail({
        to: email,
        subject: "Order Confirmation",
        text: "To see the order confirmation, please activate the html version of this email.",
        html: htmlContent,
      });
    } catch (error) {
      // Log error serveur
      console.error("Error processing charge.succeeded webhook:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
