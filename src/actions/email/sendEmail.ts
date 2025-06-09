import nodemailer from "nodemailer";
import { google } from "googleapis";

// Configuration OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

// Fonction pour envoyer un email via Gmail API
export async function sendEmail({ to, subject, text, html }: {to: string, subject: string, text: string, html: string}) {
  try {
    // Récupère le token d'accès à partir du refresh_token
    const { token } = await oAuth2Client.getAccessToken();

    // Create a transporter for SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: token,
      },
    });

    // Options du mail
    const mailOptions = {
      from: `Mon App <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // Envoi de l’email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Erreur envoi email :", error);
    throw error;
  }
}
