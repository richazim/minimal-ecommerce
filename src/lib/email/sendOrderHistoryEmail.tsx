"use server"
import { render } from '@react-email/render';
// import { Resend } from "resend"
import OrderHistoryEmail from '../../components/Email/OrderHistoryEmail';
import { sendEmail } from "@/actions/email/sendEmail";

// const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function sendOrderHistoryEmail(
  userEmail: string,
  ordersWithLinks: any[]
) {
  const reactComponent = <OrderHistoryEmail orders={ordersWithLinks} />;
  const htmlContent = await render(reactComponent);
  
  // return resend.emails.send({
  //   from: `Support <${process.env.SENDER_EMAIL}>`,
  //   to: userEmail,
  //   subject: "Order History",
  //   react: reactComponent,
  // })

  return sendEmail({
    to: userEmail,
    subject: "Order History",
    text: "To see the order history, please activate the html version of this email.",
    html: htmlContent
  })
}
