"use server";

import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<SMTPTransport.SentMessageInfo> {
  try {
    const { token } = await oAuth2Client.getAccessToken();
    if (!token) throw new Error("Access token is null");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: token,
      },
    } as TransportOptions);

    const mailOptions = {
      from: `"Mon App" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé. Message ID :", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Erreur envoi email :", error);
    throw error;
  }
}
