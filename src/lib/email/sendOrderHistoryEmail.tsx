import { Resend } from "resend"
import OrderHistoryEmail from '../../components/Email/OrderHistoryEmail';

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function sendOrderHistoryEmail(
  userEmail: string,
  ordersWithLinks: any[]
) {
  
  return resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: userEmail,
    subject: "Order History",
    react: <OrderHistoryEmail orders={ordersWithLinks} />,
  })
}
